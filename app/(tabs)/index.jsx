import { View, Text, Button, ScrollView, FlatList } from 'react-native';
import React from 'react';
//import { Redirect } from 'expo-router'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import  Header  from './../../components/Header'
import EmptyState from '../../components/EmptyState';
import AddMedicationHeader from '../../components/AddMedicationHeader';
import MedicationList from '../../components/MedicationList';
export default function HomeScreen() {
  return (
    <FlatList 
    showsVerticalScrollIndicator={false}
    data={[]}
    ListHeaderComponent={
      <View style={{
        padding:25,
        backgroundColor:'white',
        height:'100%'
    }}>
        <Header /> 
        
        <MedicationList/>
        
    </View>
    }
    />
  )
}