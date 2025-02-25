import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Tabs, useRouter} from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {
    const router=useRouter();

   useEffect(()=>{
    GetUserDetail();
   },[])

   const GetUserDetail=async()=>{
    //o	Si les informations utilisateur (userDetail) n'existent pas dans le stockage local, cela signifie que l'utilisateur n'est pas connecté, et il est redirigé vers la page de connexion (router.replace('/login')).
    const userInfo=await getLocalStorage('userDetail');
    if(!userInfo){
        router.replace('/login')
    }
   }

 //const [authenticated,setAuthenticated]=useState(null);
//if user login or not 
//Il vérifie si un utilisateur est connecté et redirige l'utilisateur vers la page de connexion s'il n'est pas authentifié.
    //onAuthStateChanged(auth, (user) => {
       // if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
         // const uid = user.uid;
         // console.log(uid);
//setAuthenticated(true);
          // ...
       // } else { 
        //    setAuthenticated(false);
          // User is signed out
          // ...
       // }
     // });
     // useEffect(()=>{
        //Cette fonction sera exécutée chaque fois que la valeur de authenticated change.
      // if(authenticated==false){
        //router?.push('/login');
      // }
      //},[authenticated])


  return (
    <Tabs screenOptions={{
        headerShown:false,
        sceneContainerStyle: {
         backgroundColor: 'white',
       },
       
    }}>
        <Tabs.Screen name='index' 
         options={{
            tabBarLabel:'Home',
            tabBarIcon:({color,size})=>(<FontAwesome name="home" size={size} color={color} />)

         }}
         />
         <Tabs.Screen name='History' 
         options={{
            tabBarLabel:'History ',
            tabBarIcon:({color,size})=>(<FontAwesome name="history" size={size} color={color}  />)

         }}
         />
        <Tabs.Screen name='Profile' 
         options={{
            tabBarLabel:'Profile ',
            tabBarIcon:({color,size})=>(<FontAwesome name="user" size={size} color={color}  />)

         }}
         />
        
    </Tabs>
  )
}