import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { usePetStore } from '@/hooks/usePetStore';
import { MedicalRecordCard } from '@/components/MedicalRecordCard';
import { PetProfileSelector } from '@/components/PetProfileSelector';
import { EmptyState } from '@/components/EmptyState';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { PawPrint } from 'lucide-react-native';

export default function MedicalScreen() {
  const { pets, selectedPetId, selectPet, medicalRecords } = usePetStore();
  
  const filteredRecords = medicalRecords
    .filter(record => record.petId === selectedPetId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <View style={styles.container}>
      <PetProfileSelector
        pets={pets}
        selectedPetId={selectedPetId}
        onSelectPet={selectPet}
      />
      
      {filteredRecords.length > 0 ? (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MedicalRecordCard
              record={item}
              onPress={(record) => router.push(`/medical/${record.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          title="No Medical Records Yet"
          message="Keep track of your pet's health by adding vaccination records, vet visits, and medications."
          icon={<PawPrint size={48} color={colors.skyEyeBlue} />}
          style={styles.emptyState}
        />
      )}
      
      <FloatingActionButton
        onPress={() => router.push('/medical/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
});