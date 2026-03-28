import { app } from '../lib/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import dogBreeds from '@/constants/dogBreeds.json';

export default function PetsScreen() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);

  const breedOptions = dogBreeds.map(b => ({ label: b, value: b }));

  const handleAddPet = async () => {
    if (!name.trim() || !breed) {
      Alert.alert('Please enter a name and breed');
      return;
    }

    const newPet = {
      name,
      breed,
      imageUrl: 'https://place-puppy.com/300x300',
    };

    try {
      await addDoc(collection(db, 'pets'), newPet);
      setPets(prev => [...prev, newPet]);
      setName('');
      setBreed('');
    } catch (e) {
      console.error('Error adding pet:', e);
    }
  };

  const fetchPets = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'pets'));
      const data = snapshot.docs.map(doc => doc.data());
      setPets(data);
    } catch (e) {
      console.error('Error fetching pets:', e);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Pet</Text>
      <TextInput
        placeholder="Pet Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <RNPickerSelect
        onValueChange={(value) => setBreed(value)}
        items={breedOptions}
        value={breed}
        placeholder={{ label: 'Select a breed...', value: null }}
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
      />
      <Button title="Add Pet" onPress={handleAddPet} />

      <FlatList
        data={pets}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.breed}>{item.breed}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8
  },
  breed: {
    fontSize: 14,
    color: '#555'
  }
});

