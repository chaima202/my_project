import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constant/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import des icônes
import { auth } from '../../config/FirebaseConfig'; // Import de l'objet auth de Firebase

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur

  // Récupérer les informations de l'utilisateur au chargement du composant
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Déconnexion avec Firebase
      await auth.signOut();
      console.log('User logged out successfully');
      
      // Rediriger vers la page de connexion
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Titre "Profile" en haut à gauche */}
      <Text style={styles.topProfileTitle}>Profile</Text>

      {/* Image en haut de l'écran */}
      <Image
        source={require('./../../assets/images/smiley.png')} // Remplacez par le chemin de votre image
        style={styles.bannerImage}
      />

      {/* En-tête du profil */}
      <View style={styles.header}>
        {user ? (
          <>
            <Text style={styles.username}>{user.displayName || 'Tubeguruji'}</Text>
            <Text style={styles.username}>{user.email}</Text>
          </>
        ) : (
          <>
            <Text style={styles.username}>Tubeguruji</Text>
            <Text style={styles.username}>gmail</Text>
          </>
        )}
      </View>

      {/* Options du profil */}
      <View style={styles.optionsContainer}>
        {/* Add New Medication */}
        <View style={styles.optionRow}>
          <View>
            <FontAwesome name="plus" size={31} color={Colors.PRIMARY} />
          </View>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('/add-new-medication')}
          >
            <Text style={styles.optionText}>Add New Medication</Text>
          </TouchableOpacity>
        </View>

        {/* My Medication */}
        <View style={styles.optionRow}>
          <FontAwesome name="medkit" size={31} color={Colors.PRIMARY} />
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('(tabs)')}
          >
            <Text style={styles.optionText}>My Medication</Text>
          </TouchableOpacity>
        </View>

        {/* History */}
        <View style={styles.optionRow}>
          <FontAwesome name="history" size={31} color={Colors.PRIMARY} />
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('/History')}
          >
            <Text style={styles.optionText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.optionRow}>
          <MaterialIcons name="logout" size={31} color={Colors.PRIMARY} />
          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topProfileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginTop: 85, // Espace en haut
    marginLeft: 40, // Aligner à gauche
  },
  bannerImage: {
    width: 120,
    height: 120,
    alignSelf: 'center', // Centrer horizontalement
    marginTop: 20, // Espace entre le titre et l'image
    resizeMode: 'contain', // Pour que l'image conserve ses proportions
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  username: {
    fontSize: 22,
    color: Colors.GRAY,
    marginTop: 10,
  },
  optionsContainer: {
    flex: 1, // Prendre tout l'espace disponible
    justifyContent: 'center', // Centrer verticalement
    alignItems: 'flex-start', // Centrer horizontalement
    marginTop: -141,
    marginLeft: 100,
  },
  optionRow: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 20,
  },
  optionButton: {
    marginLeft: 15, // Espace entre l'icône et le texte
  },
  optionText: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
  },
});