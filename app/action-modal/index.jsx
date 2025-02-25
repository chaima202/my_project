import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import moment from 'moment'; // Pour formater les dates
import Colors from '../constant/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MedicationCardItem from '../../components/MedicationCardItem';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { arrayUnion } from "firebase/firestore";


export default function MedicationActionModal() {
    const router=useRouter();
    const UpdateActionStatus=async(status)=>{
        try{
          const docRef=doc(db,'medication',medicine?.docId);
          await updateDoc(docRef,{
            action:arrayUnion({ // Adds a new object to the action array without removing existing values.
                status:status,
                date:medicine?.selectedDate,
                time: moment().format("HH:mm:ss")

                
            })
          });

          Alert.alert(status,'Response Saved!',[
            {
                text:'Ok',
                onPress:()=>router.replace('(tabs)') //the diffrenecebetween push and replace is that when we use push we add a new screen on the top of the stack but replace replace the current screen so user can not go back 
            }
          ])
        }
        catch(e){
            console.log(e)
        }
    }
  const medicine = useLocalSearchParams();

  console.log(JSON.stringify(medicine, null, 2)); // Debugging: Affiche la structure de `medicine`

  // Fonction pour parser la chaîne `reminderTime` en un objet Date
  const parseReminderTime = (timestampString) => {
    if (!timestampString) return null;  
    const match = timestampString.match(/Timestamp\(seconds=(\d+), nanoseconds=(\d+)\)/);// Extraction des secondes et nanosecondes de la chaîne
    if (!match) return null;
    const seconds = parseInt(match[1], 10); // Récupère les secondes
    const nanoseconds = parseInt(match[2], 10); // Récupère les nanosecondes 
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);// Crée un objet Date à partir des secondes (en millisecondes)
    return date;
  };

 
  const reminderTimeDate = parseReminderTime(medicine?.reminderTime); // Convertir le `reminderTime` en Date car reminderTime est une chaîne de caractères (string) 
  const formattedReminderTime = reminderTimeDate? moment(reminderTimeDate).format('HH:mm') : 'No reminder set';  // Formater la date avec moment

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/notification.gif')}
        style={{ width: 121, height: 121 }}
      />
      <Text style={{ fontSize: 18 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 35,fontWeight:'bold', marginTop:'11',color:Colors.PRIMARY }}>{formattedReminderTime}</Text>
    <Text style={{fontSize:25, fontWeight:'bold',marginTop:11}}>It's Time To Take </Text>
   
   <View style={styles.btncontainer}>
<TouchableOpacity  onPress={()=>UpdateActionStatus('Missed')} style={styles.closebtn}>
<Entypo name="cross" size={24} color="red" />
<Text style={{fontSize:21,color:'red'}}>Missed</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>UpdateActionStatus('Taken')} style={styles.successbtn}>
<AntDesign name="check" size={24} color="green" />
<Text style={{fontSize:21,color:'green'}}>Taken</Text>
</TouchableOpacity>

   </View>

   <TouchableOpacity  onPress={router.back
   } style={{position:'absolute',bottom:25}}
    >
   <AntDesign name="closecircle" size={24} color={Colors.GRAY} />
   </TouchableOpacity>
    
    
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  btncontainer:{
    flexDirection:'row',
    gap:11,
    marginTop:25
  },
  closebtn:{
    padding:11,
    flexDirection:'row',
    gap:6,
    borderWidth:1,
    borderColor:'red',
    borderRadius:11
  },
  successbtn:{
    padding:11,
    flexDirection:'row',
    gap:6,
    borderWidth:1,
    borderColor:'green',
    borderRadius:11
  }
});