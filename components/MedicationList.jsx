import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetDatesRangeToDisplay } from '../service/ConvertDteTime';
import Colors from '../app/constant/Colors';
import moment from 'moment';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import MedicationCardItem from './MedicationCardItem';
import { getLocalStorage } from '../service/Storage';
import EmptyState from './EmptyState';
import { useRouter } from 'expo-router';

export default function MedicationList() {
    const [MedList, setMedList] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
    const [loading, setloadingstate] = useState(false);
    const router = useRouter();

    useEffect(() => {
        GetDateRangeList();
        GetMedicatonList(selectedDate);
    }, [selectedDate]);

    // Fonction pour obtenir la liste des dates
    const GetDateRangeList = () => {
        const dateRange = GetDatesRangeToDisplay();
        setDateRange(dateRange);
    };

    // Fonction pour obtenir la liste des médicaments en fonction de la date sélectionnée
    const GetMedicatonList = async (selectedDate) => {
        setloadingstate(true)
        const user = await getLocalStorage('userDetail');
        setMedList([]); // Réinitialiser la liste des médicaments avant d'ajouter les nouveaux

        try {
            const q = query(
                collection(db, 'medication'),
                where('userEmail', '==', user?.email),
                where('dates', 'array-contains', selectedDate)
            );

            const querySnapshot = await getDocs(q);//Contient les résultats de la requête Firestore.
            console.log('Selected date:', selectedDate);


            querySnapshot.forEach((doc) => {//Parcourt chaque document dans les résultats.
                console.log('docId:' + doc.id + '==>', doc.data());//doc.data() : Retourne les données du document sous forme d'objet. doc.id : Retourne l'ID du document.
                setMedList((prev) => [...prev, { ...doc.data(), docId: doc.id }]);//Cela signifie que chaque élément de MedList est un objet contenant :Les données du document Firestore (doc.data())L'ID du document (docId).
            });
            setloadingstate(false)
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Failed to fetch medication list. Please try again.');
            setloadingstate(false)
        }
    };

    return (
        <View style={{ marginTop: 25 }}>
            <Image
                source={require('./../assets/images/medication.jpeg')}
                style={{
                    marginLeft: -11,
                    width: 386,
                    height: 300,
                    borderRadius: 11,
                }}
            />

            {/* Liste des dates */}
            <FlatList
                data={dateRange}
                horizontal
                style={{ marginTop: 13 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.FormattedDate}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.dateGroup,
                            {
                                backgroundColor:
                                    item.FormattedDate === selectedDate ? Colors.PRIMARY : Colors.GRIS_CLAIR,
                            },
                        ]}
                        onPress={() => {
                            setSelectedDate(item.FormattedDate);
                            GetMedicatonList(item.FormattedDate)
                        }
                        }
                    >
                        <Text
                            style={[
                                styles.day,
                                { color: item.FormattedDate === selectedDate ? 'white' : 'black' },
                            ]}
                        >
                            {item.day}
                        </Text>
                        <Text
                            style={[
                                styles.date,
                                { color: item.FormattedDate === selectedDate ? 'white' : 'black' },
                            ]}
                        >
                            {item.date}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Liste des médicaments */}
            {MedList?.length > 0 ? (
                <FlatList
                    data={MedList}
                    onRefresh={() => GetMedicatonList(selectedDate)}
                    refreshing={loading} // Assurez-vous que `loading` est bien défini dans le state
                    //keyExtractor={(item) => item.docId || item.id} // Ajout d'une alternative si `docId` est manquant
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => router.push({
                            pathname:
                                '/action-modal', 
                            params: {
                                    ...item,
                                    selectedDate: selectedDate
                                }
                        })} >
                            <MedicationCardItem medicine={item} selectedDate={selectedDate}/>
                        </TouchableOpacity>

                    )}
                />
            ) : (
                <EmptyState />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    dateGroup: {
        padding: 11,
        backgroundColor: Colors.GRIS_CLAIR,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 11,
        marginRight: 11,
        width: 61,
    },
    day: {
        fontSize: 21,
    },
    date: {
        fontSize: 26,
        fontWeight: 'bold',
    },
});
