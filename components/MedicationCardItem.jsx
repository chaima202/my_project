import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../app/constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment'; // Pour formater les dates
import AntDesign from '@expo/vector-icons/AntDesign';


export default function MedicationCardItem({ medicine, selectedDate = '' }) {
    const [status, setStatus] = useState();

    useEffect(() => {
        CheckStatus();
    }, [medicine])//Runs CheckStatus() every time medicine changes.

    const CheckStatus = () => {
        //medicine.action est un tableau contenant plusieurs objets avec date et status.
        //find() cherche dans ce tableau l'objet qui a une date correspondant à selectedDate.
        //Le résultat trouvé (data) est stocké dans status via setStatus(data).
        const data = medicine?.action?.find((item) => item.date == selectedDate);
        console.log('--', data);
        setStatus(data);
    }

    //Si tu récupères une date depuis Firestore, elle est sous forme d'objet Timestamp.   
    // Convertir le timestamp Firestore en date lisible
    const reminderTimeDate = medicine?.reminderTime?.toDate(); // Convertit Timestamp en Date
    const formattedReminderTime = reminderTimeDate ? moment(reminderTimeDate).format('HH:mm') : 'No reminder set';
    console.log('Medicine reminderTime in MedicationCardItem:', medicine?.reminderTime);
    // exmple doutputMedicine reminderTime in MedicationCardItem: {"nanoseconds": 0, "seconds": 1738800720}
    console.log('Formatted reminderTime:', formattedReminderTime);
    //apres cette conversion voila  Formatted reminderTime: 21:09

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <View style={styles.imagecontainer}>
                    <Image
                        source={{ uri: medicine?.type?.icon }} // contient une URL pointant vers medicine.type.icon
                        style={{
                            width: 65,
                            height: 65,
                        }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{medicine?.name}</Text>
                    <Text style={{ fontSize: 16 }}>{medicine?.when}</Text>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                        {medicine?.dose} {medicine?.type?.name}
                    </Text>
                </View>
            </View>

            <View style={styles.remindercontainer}>
                <Ionicons name="timer-outline" size={24} color="black" />
                <Text style={{ fontWeight: 'bold', fontSize: 21 }}>
                    {formattedReminderTime}
                </Text>
            </View>


            {status?.date && <View style={styles.statuscontainer}>
                {status?.status == 'Taken' ? <AntDesign name="checkcircle" size={24} color="green" />
                    : status?.status == 'Missed' &&
                    <AntDesign name="closecircle" size={24} color="red" />}
            </View>}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 11,
        marginTop: 11,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.GRIS_CLAIR,
    },
    imagecontainer: {
        padding: 11,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 18,
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    remindercontainer: {
        padding: 21,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.GRIS_CLAIR,
    },
    statuscontainer: {
        position: 'absolute',
        padding: 5,
        top: 5,


    }
});