import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebaseConfig';

const db = getFirestore(app);

export default function PetSelectorHeader() {
  const [pets, setPets] = useState<any[]>([]);
  const [selectedPet, setSelectedPet] = useState<any>(null);

  useEffect(() => {
    const fetchPets = async () => {
      const snapshot = await getDocs(collection(db, 'pets'));
      const petData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPets(petData);
      if (petData.length > 0) setSelectedPet(petData[0]);
    };
    fetchPets();
  }, []);

  const selectPet = (pet: any) => {
    setSelectedPet(pet);
    // Later: update context or store
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Pet:</Text>
      {selectedPet ? (
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.petRow}>
            {selectedPet.photoUrl && (
              <Image source={{ uri: selectedPet.photoUrl }} style={styles.avatar} />
            )}
            <Text style={styles.petName}>{selectedPet.name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>No pets yet</Text>
      )}

      <FlatList
        data={pets}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectPet(item)} style={styles.petBubble}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  petName: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  petBubble: {
    backgroundColor: '#eee',
    padding: 8,
    marginRight: 8,
    borderRadius: 16,
  },
});

