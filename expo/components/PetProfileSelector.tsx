import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { Pet } from '@/types/pet';

type PetProfileSelectorProps = {
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
};

export const PetProfileSelector = ({ pets, selectedPetId, onSelectPet }: PetProfileSelectorProps) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {pets.map((pet) => (
        <TouchableOpacity
          key={pet.id}
          style={[
            styles.petItem,
            pet.id === selectedPetId && styles.selectedPetItem
          ]}
          onPress={() => onSelectPet(pet.id)}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: pet.profileImage }}
              style={styles.petImage}
            />
          </View>
          <Text style={styles.petName}>{pet.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  petItem: {
    alignItems: 'center',
    opacity: 0.7,
  },
  selectedPetItem: {
    opacity: 1,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.skyEyeBlue,
    overflow: 'hidden',
    marginBottom: 8,
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  petName: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
});