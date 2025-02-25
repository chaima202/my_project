import { View, Text,StyleSheet,TextInput ,TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constant/Colors';
import { useRouter } from 'expo-router';
import {auth} from './../../config/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setLocalStorage } from '../../service/Storage';

export default function SignUp() {

  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [userName,setUserName]=useState();

  const OnCreateAccount=()=>{
    if(!email||!password||!userName){
        ToastAndroid.show('please fill all details',ToastAndroid.BOTTOM);
        Alert.alert('Please enter your email and password');
        return ;
    }
// this inner code was extracted to firebase documentation then authentification then sign up code with some modification ..
    
createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    await updateProfile(user,{
        displayName:userName
    })
    await setLocalStorage('userDetail',user);//stocker les informations de l'utilisateur connecté dans la mémoire locale de l'application.
    router.push('(tabs)')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode=='auth/email-already-in-use'){
        ToastAndroid.show('Email already exist',ToastAndroid.BOTTOM)
    Alert.alert('email deja existe')
    }
    // ..
  });
  }

  return (
    <View style={{
        padding:25
    }}>
      <Text style={styles?.textHeader}>Create New Account </Text>
      <Text style={styles?.subText}>Welcome to Your New Journey!</Text>
           
           <View style={{marginTop:45}}>
               <Text style={{fontWeight:'bold' }}>Full Name</Text>
               <TextInput placeholder='Enter Your Full Name'  placeholderTextColor={Colors.GRAY}  style={styles.textInput}
               onChangeText={(value)=>setUserName(value)}/>
           </View>

           <View style={{marginTop:25}}>
               <Text style={{fontWeight:'bold'}}>Email</Text>
               <TextInput placeholder='Enter Your Email'  placeholderTextColor={Colors.GRAY} style={styles.textInput}
               onChangeText={(value)=>setEmail(value)}
               />
           </View>

           <View style={{marginTop:25}}>
               <Text style={{fontWeight:'bold'}}>Password</Text>
               <TextInput placeholder='Enter Your Passeword'  placeholderTextColor={Colors.GRAY} style={styles.textInput} 
               secureTextEntry={true} onChangeText={(value)=>setPassword(value)}/>
           </View>
       <View style={{marginTop:98 , padding:1}}>     
         <TouchableOpacity style={styles?.button}
         onPress={OnCreateAccount}>
                 <Text style={{
                                 fontSize:15,
                                 textAlign:'center',
                                 fontWeight:'bold',
                                 color: 'white'
                             }} >Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles?.button2}
               onPress={()=>router.push('login/signIn')}>
               <Text style={{
                                 fontSize:15,
                                 textAlign:'center',
                                 fontWeight:'bold',
                                 color:Colors.PRIMARY
                             }}> Already Account? Sign In </Text>
        </TouchableOpacity>  
</View>



    </View>
  )
}
  const styles=StyleSheet.create({
  
     textHeader:{
      fontSize:30,
      fontWeight:'bold',
      marginTop:66
     } ,
     subText:{
      fontSize:30 ,
      fontWeight:'bold',
      marginTop:10, 
    color:Colors.GRAY ,
     },
     textInput :{
     padding:10, 
     borderWidth:1,
     fontSize:18,
     borderRadius:10,
     marginTop:5,
     backgroundColor:'white',
     height:63
     },
     button : {
      padding:20,
      backgroundColor:Colors.PRIMARY,
      borderRadius:15, 
      marginTop:35,
      
  },
  subText:{
      fontSize:30 ,
      fontWeight:'bold',
      marginTop:10, 
    color:Colors.PRIMARY ,
     },
  button2 : {
      padding:20,
      backgroundColor:'white',
      borderRadius:15, 
      marginTop:35,
      borderColor:Colors.PRIMARY,
      borderWidth:1
      
  }
  
  })
