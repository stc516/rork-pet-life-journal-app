import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { PetProfileSelector } from '@/app/components/PetProfileSelector';
import { JournalEntryCard } from '@/app/components/JournalEntryCard';
import { ReminderCard } from '@/app/components/ReminderCard';
import { ActivityCard } from '@/app/components/ActivityCard';
import { Calendar, Clock, Edit, Map, Plus } from 'lucide-react-native';

export default function HomeScreen() {
  const { 
    pets, 
    selectedPetId, 
    selectPet, 
    journalEntries, 
    reminders,
    activities,
    toggleReminderComplete
  } = usePetStore();
  
  const [selectedPet, setSelectedPet] = useState(pets.find(pet => pet.id === selectedPetId));
  
  useEffect(() => {
    setSelectedPet(pets.find(pet => pet.id === selectedPetId));
  }, [selectedPetId, pets]);
  
  const filteredJournalEntries = journalEntries
    .filter(entry => entry.petId === selectedPetId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  const upcomingReminders = reminders
    .filter(reminder => 
      reminder.petId === selectedPetId && 
      !reminder.completed &&
      new Date(reminder.date) >= new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  const recentActivities = activities
    .filter(activity => activity.petId === selectedPetId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const calculateAge = (birthdate?: Date) => {
    if (!birthdate) return 'Unknown';
    
    const today = new Date();
    const birth = new Date(birthdate);
    
    let years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
    }
    
    return years === 0 
      ? `${Math.max(0, months)} months` 
      : `${years} ${years === 1 ? 'year' : 'years'}`;
  };

  if (!selectedPet) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Welcome to Pet Life Journal</Text>
        <Text style={styles.emptyText}>Add your first pet to get started</Text>
        <TouchableOpacity 
          style={styles.addPetButton}
          onPress={() => router.push('/pet/new')}
        >
          <Plus size={20} color={colors.whiteFur} />
          <Text style={styles.addPetButtonText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PetProfileSelector
        pets={pets}
        selectedPetId={selectedPetId}
        onSelectPet={selectPet}
      />
      
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: selectedPet.profileImage }}
              style={styles.profileImage}
            />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.petName}>{selectedPet.name}</Text>
            <Text style={styles.petBreed}>{selectedPet.breed}</Text>
            
            <View style={styles.petDetailsContainer}>
              {selectedPet.birthdate && (
                <View style={styles.petDetailItem}>
                  <Text style={styles.petDetailLabel}>Age</Text>
                  <Text style={styles.petDetailValue}>{calculateAge(selectedPet.birthdate)}</Text>
                </View>
              )}
              
              {selectedPet.weight && (
                <View style={styles.petDetailItem}>
                  <Text style={styles.petDetailLabel}>Weight</Text>
                  <Text style={styles.petDetailValue}>{selectedPet.weight} lbs</Text>
                </View>
              )}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push(`/pet/${selectedPet.id}`)}
          >
            <Edit size={18} color={colors.skyEyeBlue} />
          </TouchableOpacity>
        </View>
        
        {selectedPet.adoptionDate && (
          <View style={styles.adoptionDateContainer}>
            <Calendar size={16} color={colors.skyEyeBlue} />
            <Text style={styles.adoptionDateText}>
              Adoption Day: {formatDate(selectedPet.adoptionDate)}
            </Text>
          </View>
        )}
      </View>
      
      {recentActivities.length > 0 && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <Link href="/activities" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {recentActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onPress={(activity) => router.push(`/activity/${activity.id}`)}
            />
          ))}
          
          <TouchableOpacity 
            style={styles.trackActivityButton}
            onPress={() => router.push('/activity/new')}
          >
            <Map size={16} color={colors.whiteFur} />
            <Text style={styles.trackActivityText}>Track New Activity</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Journal Entries</Text>
          <Link href="/journal" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        {filteredJournalEntries.length > 0 ? (
          filteredJournalEntries.map(entry => (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              onPress={(entry) => router.push(`/journal/${entry.id}`)}
            />
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No journal entries yet</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/journal/new')}
            >
              <Plus size={16} color={colors.whiteFur} />
              <Text style={styles.addButtonText}>Add Entry</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Reminders</Text>
          <Link href="/reminders" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        {upcomingReminders.length > 0 ? (
          upcomingReminders.map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onToggleComplete={toggleReminderComplete}
              onPress={(reminder) => router.push(`/reminder/${reminder.id}`)}
            />
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No upcoming reminders</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/reminder/new')}
            >
              <Plus size={16} color={colors.whiteFur} />
              <Text style={styles.addButtonText}>Add Reminder</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/journal/new')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.skyEyeBlue }]}>
              <Edit size={20} color={colors.whiteFur} />
            </View>
            <Text style={styles.quickActionText}>New Journal Entry</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/activity/new')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: '#FF9800' }]}>
              <Map size={20} color={colors.whiteFur} />
            </View>
            <Text style={styles.quickActionText}>Track Activity</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/medical/new')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.accentGreen }]}>
              <PawPrint size={20} color={colors.whiteFur} />
            </View>
            <Text style={styles.quickActionText}>Add Medical Record</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/reminder/new')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: '#FFC107' }]}>
              <Clock size={20} color={colors.whiteFur} />
            </View>
            <Text style={styles.quickActionText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

import { PawPrint } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  profileSection: {
    backgroundColor: colors.whiteFur,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  petName: {
    ...fonts.bold,
    fontSize: 24,
    color: colors.baileyBlack,
    marginBottom: 4,
  },
  petBreed: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 8,
  },
  petDetailsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  petDetailItem: {
    flexDirection: 'column',
  },
  petDetailLabel: {
    ...fonts.regular,
    fontSize: 12,
    color: colors.darkGray,
  },
  petDetailValue: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  editButton: {
    padding: 8,
  },
  adoptionDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  adoptionDateText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.skyEyeBlue,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
  },
  seeAllText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.skyEyeBlue,
  },
  emptyStateContainer: {
    backgroundColor: colors.whiteFur,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyStateText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.skyEyeBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  addButtonText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.whiteFur,
  },
  trackActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyEyeBlue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  trackActivityText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.whiteFur,
  },
  quickActionsContainer: {
    marginHorizontal: 16,
  },
  quickActionsTitle: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: colors.whiteFur,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    ...fonts.medium,
    fontSize: 12,
    color: colors.baileyBlack,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    ...fonts.bold,
    fontSize: 24,
    color: colors.baileyBlack,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 24,
    textAlign: 'center',
  },
  addPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.skyEyeBlue,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  addPetButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
});