import { View, Text,StyleSheet,TextInput ,TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constant/Colors';
import { useRouter } from 'expo-router';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from './../../config/FirebaseConfig';
import { setLocalStorage } from '../../service/Storage';
export default function SignIn() {
   const router=useRouter(); //cela permet de naviguer entre les ecran de l app

   const [email,setEmail]=useState();
   //useState() : C'est un hook React qui permet de gérer l'état d'une variable.
   //email : Cette variable contient l'email saisi par l'utilisateur.
    //setEmail : C'est une fonction qui met à jour la valeur de email.
   const [password,setPassword]=useState();


   const OnSignInClick=()=>{
    if(!email||!password){
        // si l email pou password n est pas defini ou vide
            Alert.alert('Please entrer email and Password');
            return ;
        }

    signInWithEmailAndPassword(auth, email, password)
    // Une fonction de Firebase qui permet de connecter un utilisateur en utilisant son email et son mot de passe.
  .then(async(userCredential) => {
    //Si la connexion est réussie
    // Signed in 
    const user = userCredential.user;// Contient les informations sur l'utilisateur connecté (par exemple, son identifiant Firebase).
    console.log(user);//Affiche les informations de l'utilisateur dans la console (utile pour déboguer).
      await setLocalStorage('userDetail',user);//stocker les informations de l'utilisateur connecté dans la mémoire locale de l'application.
    router.replace('(tabs)')//redirige l'utilisateur vers l'écran (tabs).

    // ...
  })
  .catch((error) => {
    ////Si la connexion est echouée
    const errorCode = error.code;// Récupère le code de l'erreur renvoyée par Firebase
    const errorMessage = error.message;//Récupère un message descriptif de l'erreur.
    if(errorCode=='auth/invalid-credential'){
        //Vérifie si le code d'erreur indique que les identifiants sont invalides.

            ToastAndroid.show('invalid email or password',ToastAndroid.BOTTOM)
        Alert.alert('invalid email or password')
        }
  });
   }

  return (
    <View style={{
        padding:25
    }}>
      <Text style={styles?.textHeader}>Let's Sign You In </Text>
      <Text style={styles?.subText}>Welcome Back </Text>
      <Text style={styles?.subText}>You Have been missed! </Text>

    <View style={{marginTop:45}}>
        <Text  style={{fontWeight:'bold' }}>Email</Text>
        <TextInput placeholder='Enter Your Email'  placeholderTextColor={Colors.GRAY} style={styles.textInput}
        onChangeText={(value)=>setEmail(value)}
        //value : Représente le texte saisi par l'utilisateur dans le champ de texte...
        //setEmail(value): Met à jour l'état email avec la nouvelle valeur saisie..
/>
    </View>

    <View style={{marginTop:25}}>
        <Text  style={{fontWeight:'bold' }}>Passeword</Text>
        <TextInput placeholder='Enter Your Passeword' placeholderTextColor={Colors.GRAY} style={styles.textInput} 
        secureTextEntry={true} onChangeText={(value)=>setPassword(value)}/>
    </View>
<View style={{marginTop:188 , padding:1}}> 
     <TouchableOpacity style={styles?.button}
      onPress={OnSignInClick}>
        <Text style={{
                        fontSize:15,
                        textAlign:'center',
                        fontWeight:'bold',
                        color: 'white'
                    }} >Login</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles?.button2}
      onPress={()=>router.push('login/signUp')}>
      
        <Text style={{
                        fontSize:15,
                        textAlign:'center',
                        fontWeight:'bold',
                        color:Colors.PRIMARY
                    }} >Create Account</Text>
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
  color:Colors.PRIMARY ,
   },
   textInput :{
   padding:10, 
   borderWidth:1,
   fontSize:18,
   borderRadius:10,
   marginTop:5,
   backgroundColor:'white',
   height:63,
   
   },
   button : {
    padding:20,
    backgroundColor:Colors.PRIMARY,
    borderRadius:15, 
    marginTop:35,
    
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