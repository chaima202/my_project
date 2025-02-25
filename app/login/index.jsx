import { View,Image,Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import Colors from '../constant/Colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

   const router=useRouter();

  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:40

      }}>
        <Image source={require('./../../assets/images/login.png')}
        style={styles?.Image}
        />
      </View>
      <View style={{
        padding:25,
        backgroundColor:Colors.PRIMARY,
        height:'100%'
      }}>
          <Text style={{
            fontSize:30, 
            fontWeight:'bold',
            color:'white',
            textAlign:'center'
          }}
          
          >Stay on Track, Stay Healthy! </Text>
          <Text style={{
            color:'white',
            textAlign:'center',
            fontSize:17,
            marginTop:20 
          }}>
            Track your meds,Take control of your health. Stay consitent , stay confident
          </Text>

         <TouchableOpacity style={styles?.button}
         onPress={()=>router.push('login/signIn')}>
            <Text style={{
                color:'white',
                fontSize:20,
                color:Colors.PRIMARY,
                textAlign:'center'
            }}
            >Continue</Text>
         </TouchableOpacity>
         <Text style={{
            color:'white',
            marginTop:8
         }}>
            Note: By Clicking Continue button , you will agree to our terms and conditions 
         </Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    Image : {
        width : 210 ,
        height : 450 ,
        borderRadius: 23
    },
    button : {
         padding:15,
         backgroundColor:'white',
         borderRadius:99, 
         marginTop:25
    }
})