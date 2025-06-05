import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { usePetStore } from '@/hooks/usePetStore';
import { ActivityCard } from '@/components/ActivityCard';
import { PetProfileSelector } from '@/components/PetProfileSelector';
import { EmptyState } from '@/components/EmptyState';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Map } from 'lucide-react-native';

export default function ActivitiesScreen() {
  const { pets, selectedPetId, selectPet, activities } = usePetStore();
  
  const filteredActivities = activities
    .filter(activity => activity.petId === selectedPetId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <View style={styles.container}>
      <PetProfileSelector
        pets={pets}
        selectedPetId={selectedPetId}
        onSelectPet={selectPet}
      />
      
      {filteredActivities.length > 0 ? (
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              activity={item}
              onPress={(activity) => router.push(`/activity/${activity.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          title="No Activities Recorded Yet"
          message="Track your walks, runs, and playtime with your pet to see their activity history."
          icon={<Map size={48} color={colors.skyEyeBlue} />}
          style={styles.emptyState}
        />
      )}
      
      <FloatingActionButton
        onPress={() => router.push('/activity/new')}
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