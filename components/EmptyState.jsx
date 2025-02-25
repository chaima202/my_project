import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ConstantString from '../app/constant/ConstantString'
import Colors from '../app/constant/Colors'
import { useRouter } from 'expo-router';

export default function EmptyState() {
    const router=useRouter();
    return (
        <View
            style={{
                marginTop: 85,
                display: 'flex',
                alignItems: 'center',

            }}>
            <Image source={require('./../assets/images/medicine.png')}
                style={{
                    width: 152,
                    height: 152,

                }}
            />
            <Text style={{
                fontWeight: 'bold',
                fontSize: '31',
                marginTop: 30
            }}>{ConstantString.NoMedication}</Text>
            <Text style={{
                color: Colors.DARK_GRAY,
                textAlign: 'center',
                fontSize: '18',
                marginTop: 21
            }}>  {ConstantString.medicationSubText}</Text>
            <TouchableOpacity style={{
                backgroundColor: Colors.PRIMARY,
                padding: 15,
                marginTop: 22,
                borderRadius: 11,
                width: '90%'  }}
 onPress={()=>router.push('/add-new-medication')}
             >
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 22,
                    textAlign: 'center'
                }}>
                    {ConstantString.addnewmed}
                </Text>
            </TouchableOpacity>

        </View>
    )
}