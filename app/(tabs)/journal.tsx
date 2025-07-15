import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { JournalEntryCard } from '@/app/components/JournalEntryCard';
import { PetProfileSelector } from '@/app/components/PetProfileSelector';
import { EmptyState } from '@/app/components/EmptyState';
import { FloatingActionButton } from '@/app/components/FloatingActionButton';
import { Book, Filter } from 'lucide-react-native';

export default function JournalScreen() {
  const { pets, selectedPetId, selectPet, journalEntries } = usePetStore();
  const [filterVisible, setFilterVisible] = useState(false);
  
  const filteredEntries = journalEntries
    .filter(entry => entry.petId === selectedPetId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <View style={styles.container}>
      <PetProfileSelector
        pets={pets}
        selectedPetId={selectedPetId}
        onSelectPet={selectPet}
      />
      
      {filteredEntries.length > 0 ? (
        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JournalEntryCard
              entry={item}
              onPress={(entry) => router.push(`/journal/${entry.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          title="No Journal Entries Yet"
          message="Start documenting your pet's adventures and special moments."
          icon={<Book size={48} color={colors.skyEyeBlue} />}
          style={styles.emptyState}
        />
      )}
      
      <FloatingActionButton
        onPress={() => router.push('/journal/new')}
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