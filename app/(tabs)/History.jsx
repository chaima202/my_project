import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GetPrevDateRangeToDisplay } from '../../service/ConvertDteTime';
import moment from 'moment';
import Colors from '../constant/Colors';

import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getLocalStorage } from '../../service/Storage';
import MedicationCardItem from '../../components/MedicationCardItem';
import { useRouter } from 'expo-router'; // Import router

export default function History() {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [loading, setLoading] = useState(false);
  const [MedList, setMedList] = useState([]);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    GetDateList();
    GetMedicatonList(selectedDate);
  }, []);

  const GetDateList = () => {
    const dates = GetPrevDateRangeToDisplay();
    setDateRange(dates);
  };

  const GetMedicatonList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage('userDetail');
    setMedList([]); // Réinitialiser la liste des médicaments avant d'ajouter les nouveaux

    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user?.email),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshot = await getDocs(q);
      console.log('Selected date:', selectedDate);

      const medications = [];
      querySnapshot.forEach((doc) => {
        console.log('docId:' + doc.id + '==>', doc.data());
        medications.push({ ...doc.data(), docId: doc.id });
      });

      setMedList(medications);
      setLoading(false);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to fetch medication list. Please try again.');
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={MedList}
      style={{
        backgroundColor:'white'
      }} // Rendre la liste des médicaments ici
      ListHeaderComponent={
        <View style={styles.maincontainer}>
          <Image
            source={require('./../../assets/images/med-history.png')}
            style={styles.imagebanner}
          />
          <Text style={styles.text1}>Medication History</Text>

          {/* Liste des dates */}
          <FlatList
            data={dateRange}
            horizontal
            style={{ marginTop: 13 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.formatted}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateGroup,
                  {
                    backgroundColor:
                      item.formatted === selectedDate ? Colors.PRIMARY : Colors.GRIS_CLAIR,
                  },
                ]}
                onPress={() => {
                  setSelectedDate(item.formatted);
                  GetMedicatonList(item.formatted);
                }}
              >
                <Text
                  style={[
                    styles.day,
                    { color: item.formatted === selectedDate ? 'white' : 'black' },
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.date,
                    { color: item.formatted === selectedDate ? 'white' : 'black' },
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Indicateur de chargement */}
          {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}
        </View>
      }
      keyExtractor={(item) => item.docId}
      renderItem={({ item }) => (
        <TouchableOpacity 
        style={{ paddingHorizontal: 12 }}
          onPress={() =>
            router.push({
              pathname: '/action-modal',
              params: {
                ...item,
                selectedDate: selectedDate,
              },
            })
          }
        >
          <MedicationCardItem medicine={item} selectedDate={selectedDate} />
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 22,
              padding: 31,
              fontWeight: 'bold',
              color: Colors.GRAY,
              textAlign: 'center',
            }}
          >
            No medication Found
          </Text>
        </View>
      }
      onRefresh={() => GetMedicatonList(selectedDate)}
      refreshing={loading}
    />
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    padding: 25,
    backgroundColor: 'white',
  },
  imagebanner: {
    width: '100%',
    height: 281,
    borderRadius: 15,
    marginTop: 66,
  },
  text1: {
    fontSize: 31,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateGroup: {
    padding: 11,
    backgroundColor: 'white',
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