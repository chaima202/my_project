import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../service/Storage';
import Feather from '@expo/vector-icons/Feather';
import Colors from '../app/constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function Header() {
    const router=useRouter();
    const [user, setUser] = useState();
    //user est la variable d'état qui va stocker les informations de l'utilisateur (comme par exemple, son displayName, etc.).

    useEffect(() => {
        //Le hook useEffect() te permet d'exécuter une fonction (ou un effet secondaire) après que le composant ait été monté.
        GetUserDetail();
    }, []// un tableau vide cad une seule fois  et pas après chaque mise à jour du composant.
    )


    const GetUserDetail = async () => {
        const userInfo = await getLocalStorage('userDetail');
        console.log(userInfo); // Check the logged data
        setUser(userInfo);
    };


    return (
        <View style={{
            marginTop: 25
        }}>
            <View style={{
                display:'flex',
                flexDirection:'row',            
                alignItems:'center',
                justifyContent:'space-between',
                width:'100%'

            }}>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 11,
                }}>

                    <Image source={require('./../assets/images/smiley.png')}
                        style={{
                            height: 45,
                            width: 45
                        }} />

                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}
                    >Hello {user?.displayName || 'Guest'} 👋</Text>
                     
                </View>
                <TouchableOpacity onPress={()=>router.push('./add-new-medication')}>
                <Ionicons name="medkit-outline" size={33} color={Colors.PRIMARY} />
                </TouchableOpacity>
               
       
            </View>

        </View>
    )
}