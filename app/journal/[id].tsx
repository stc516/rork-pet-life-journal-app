import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { Calendar, Cloud, Edit, MapPin, Trash2 } from 'lucide-react-native';

export default function JournalEntryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { journalEntries, deleteJournalEntry, pets } = usePetStore();
  
  const entry = journalEntries.find(entry => entry.id === id);
  
  if (!entry) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Journal entry not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const pet = pets.find(pet => pet.id === entry.petId);
  
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteJournalEntry(entry.id);
            router.back();
          }
        }
      ]
    );
  };
  
  const handleEdit = () => {
    // Navigate to edit screen
    // This would be implemented in a real app
    Alert.alert("Edit", "Edit functionality would be implemented here");
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Calendar size={18} color={colors.darkGray} />
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        
        <View style={styles.metaContainer}>
          {entry.weather && (
            <View style={styles.metaItem}>
              <Cloud size={16} color={colors.darkGray} />
              <Text style={styles.metaText}>{entry.weather}</Text>
            </View>
          )}
          
          {entry.location && (
            <View style={styles.metaItem}>
              <MapPin size={16} color={colors.darkGray} />
              <Text style={styles.metaText}>{entry.location}</Text>
            </View>
          )}
        </View>
      </View>
      
      <Text style={styles.content}>{entry.content}</Text>
      
      {entry.photos && entry.photos.length > 0 && (
        <View style={styles.photosContainer}>
          {entry.photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photo}
            />
          ))}
        </View>
      )}
      
      <View style={styles.tagsContainer}>
        {entry.activities && entry.activities.map((activity) => (
          <View key={activity} style={styles.tag}>
            <Text style={styles.tagText}>{activity}</Text>
          </View>
        ))}
        
        {entry.mood && (
          <View style={[styles.tag, styles.moodTag]}>
            <Text style={styles.tagText}>{entry.mood}</Text>
          </View>
        )}
        
        {entry.healthStatus && (
          <View style={[styles.tag, styles.healthTag]}>
            <Text style={styles.tagText}>{entry.healthStatus}</Text>
          </View>
        )}
      </View>
      
      {pet && (
        <View style={styles.petContainer}>
          <Text style={styles.petLabel}>Pet:</Text>
          <Text style={styles.petName}>{pet.name}</Text>
        </View>
      )}
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Edit size={20} color={colors.whiteFur} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Trash2 size={20} color={colors.whiteFur} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFur,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  date: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.darkGray,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  content: {
    ...fonts.regular,
    fontSize: 18,
    color: colors.baileyBlack,
    lineHeight: 28,
    marginBottom: 24,
  },
  photosContainer: {
    marginBottom: 24,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  moodTag: {
    backgroundColor: colors.skyEyeBlue,
  },
  healthTag: {
    backgroundColor: colors.accentGreen,
  },
  tagText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  petContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  petLabel: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.darkGray,
    marginRight: 8,
  },
  petName: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyEyeBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.skyEyeBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
});