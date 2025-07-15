import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { ReminderCard } from '@/app/components/ReminderCard';
import { PetProfileSelector } from '@/app/components/PetProfileSelector';
import { EmptyState } from '@/app/components/EmptyState';
import { FloatingActionButton } from '@/app/components/FloatingActionButton';
import { Calendar } from 'lucide-react-native';

export default function RemindersScreen() {
  const { pets, selectedPetId, selectPet, reminders, toggleReminderComplete } = usePetStore();
  const [showCompleted, setShowCompleted] = useState(false);
  
  const filteredReminders = reminders
    .filter(reminder => 
      reminder.petId === selectedPetId && 
      (showCompleted || !reminder.completed)
    )
    .sort((a, b) => {
      // Sort by completed status first, then by date
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  
  return (
    <View style={styles.container}>
      <PetProfileSelector
        pets={pets}
        selectedPetId={selectedPetId}
        onSelectPet={selectPet}
      />
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            !showCompleted && styles.activeFilterButton
          ]}
          onPress={() => setShowCompleted(false)}
        >
          <Text style={[
            styles.filterText,
            !showCompleted && styles.activeFilterText
          ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            showCompleted && styles.activeFilterButton
          ]}
          onPress={() => setShowCompleted(true)}
        >
          <Text style={[
            styles.filterText,
            showCompleted && styles.activeFilterText
          ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredReminders.length > 0 ? (
        <FlatList
          data={filteredReminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReminderCard
              reminder={item}
              onToggleComplete={toggleReminderComplete}
              onPress={(reminder) => router.push(`/reminder/${reminder.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          title={showCompleted ? "No Completed Reminders" : "No Upcoming Reminders"}
          message={showCompleted 
            ? "Completed reminders will appear here." 
            : "Set reminders for medications, vet visits, grooming, and more."}
          icon={<Calendar size={48} color={colors.skyEyeBlue} />}
          style={styles.emptyState}
        />
      )}
      
      <FloatingActionButton
        onPress={() => router.push('/reminder/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.whiteFur,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.skyEyeBlue,
  },
  filterText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.darkGray,
  },
  activeFilterText: {
    color: colors.whiteFur,
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
});