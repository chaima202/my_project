import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, TextInput, Modal, Alert, ActivityIndicator, } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../app/constant/Colors';
import { WhenToTake, TypeList } from '../app/constant/Options';
import { formatDateForText, getDatesRange } from '../service/ConvertDteTime';
import { db } from '../config/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection } from "firebase/firestore";
import { useRouter } from 'expo-router';

const getLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
        return null;
    }
};
// Reusable DatePicker Component
const DatePicker = ({ label, value, onChange, mode = 'date', iconName, customStyle }) => {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.InputGroup, customStyle]}
            //style={[styles.InputGroup, { flex: 1 }]}
            onPress={() => setShowPicker(true)}
        >
            {iconName === 'calendar' ? (
                <EvilIcons style={styles.icon} name="calendar" size={24} color="black" />
            ) : (
                <Ionicons style={styles.icon} name={iconName} size={24} color="black" />
            )}
            <Text style={styles.textInput}>
                {value ? (mode === 'time' ? value.toLocaleTimeString() : formatDateForText(value)) : label}
            </Text>

            {showPicker && (
                <RNDateTimePicker
                    mode={mode}
                    minimumDate={mode === 'date' ? new Date() : undefined}
                    onChange={(event, date) => {
                        setShowPicker(false);
                        if (date) onChange(date);
                    }}
                    value={value ? new Date(value) : new Date()}
                />
            )}
        </TouchableOpacity>
    );
};

// Main AddMedicationForm Component
export default function AddMedicationForm() {
    const [formData, setFormData] = useState({
        name: '',
        type: null,
        dose: '',
        when: '',
        startDate: null,
        endDate: null,
        reminderTime: null, // New field for reminder time
    });
    const [modalVisible, setModalVisible] = useState(false);

    const onHandleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const [loading, setLoading] = useState(false);
    const router = useRouter();



    const SaveMedication = async () => {
        console.log("Form Data before saving:", formData);
        const docId = Date.now().toString();
        const user = await getLocalStorage('userDetail');
        if (!formData?.name || !formData?.type || !formData?.dose || !formData?.startDate || !formData?.endDate || !formData?.when || !formData?.reminderTime) {
            Alert.alert('Attention', 'Please fill in all fields');
            return;
        }
        const dates=getDatesRange(formData?.startDate,formData?.endDate);
        console.log(dates);
        setLoading(true);
        try {
            await setDoc(doc(db, 'medication', docId), {
                ...formData,
                userEmail: user?.email,
                docId: docId ,
                dates:dates
            });
            console.log('Data Saved Successfully!');
            setLoading(false);
            Alert.alert('Great!', 'New Medication Added Successfully ', [{
                text: 'OKkay',
                onPress: () => router.push('(tabs)')
            }])

        } catch (e) {
            setLoading(false);
            console.log('Error saving data:', e);
        }
    }


    return (
        <ScrollView style={{ padding: 25 }}>
            <Text style={styles.Header}>Add New Medication</Text>

            {/* Medicine Name */}
            <View style={styles.InputGroup}>
                <Ionicons style={styles.icon} name="medkit-outline" size={24} color="black" />
                <TextInput
                    style={styles.textInput}
                    placeholder="Medicine Name"
                    placeholderTextColor="#999"
                    onChangeText={(value) => onHandleInputChange('name', value)}
                />
            </View>

            {/* Type List */}
            <FlatList
                data={TypeList}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 8 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.InputGroup,
                            { marginRight: 11 },
                            { backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : 'white' },
                        ]}
                        onPress={() => onHandleInputChange('type', item)}
                    >
                        <Text
                            style={[
                                { fontSize: 16 },
                                { color: item.name === formData?.type?.name ? 'white' : 'black' },
                            ]}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Dose Input */}
            <View style={styles.InputGroup}>
                <Ionicons style={styles.icon} name="eyedrop-outline" size={24} color="black" />
                <TextInput
                    style={styles.textInput}
                    placeholder="Dose (e.g., 2, 15ml)"
                    placeholderTextColor="#999"
                    onChangeText={(value) => onHandleInputChange('dose', value)}
                />
            </View>

            {/* When to Take */}
            <TouchableOpacity style={styles.InputGroup} onPress={() => setModalVisible(true)}>
                <Ionicons style={styles.icon} name="time-outline" size={24} />
                <Text style={{ flex: 1, fontSize: 16, color: formData?.when ? 'black' : '#999' }}>
                    {formData?.when || 'Select time'}
                </Text>
            </TouchableOpacity>

            {/* Modal for Time Selection */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={WhenToTake}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => onHandleInputChange('when', item)}
                                >
                                    <Text style={styles.listText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Start and End Date */}
            <View style={styles.dategroup}>
                <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(date) => onHandleInputChange('startDate', date)}
                    iconName="calendar"
                    customStyle={{ flex: 1 }}
                />
                <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(date) => onHandleInputChange('endDate', date)}
                    iconName="calendar"
                    customStyle={{ flex: 1 }}
                />
            </View>

            {/* Reminder Time */}
            <DatePicker
                label="Select Reminder Time"
                value={formData.reminderTime}
                onChange={(date) => onHandleInputChange('reminderTime', date)}
                mode="time"
                iconName="time-outline"
                customStyle={styles.reminderPickerStyle}
            />

            <TouchableOpacity style={styles.button} onPress={SaveMedication}>
                {loading ? ( //ativityindicator est un spinner de attendant
                    <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                    <Text style={styles.buttontextstyle}>Add New Medication</Text>
                )}
                {/* cette expression est ternaire c est a dire si loading est true alors exceuter expression 1 sinon 2 */}
            </TouchableOpacity>


        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    buttontextstyle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
        width: '100%',
        marginTop: 11
    },

    reminderPickerStyle: {
        height: 66,
        borderWidth: 1.5,
    },
    Header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    InputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        marginTop: 11,
        backgroundColor: 'white',
        height: 61,
    },
    icon: {
        color: Colors.PRIMARY,
        borderRightWidth: 1,
        paddingRight: 12,
        borderColor: '#E5E7EB',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    listText: {
        fontSize: 18,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        marginLeft: 11,
        fontSize: 16,
    },
    dategroup: {
        flexDirection: 'row',
        gap: 11,
    },
});