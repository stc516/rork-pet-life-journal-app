import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { usePetStore } from '../hooks/usePetStore';
import { ActivityType, MoodType, WeatherType } from '../types/pet';
import { FontAwesome, MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

//import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';


export default function NewJournalEntryScreen() {
  const { selectedPetId, addJournalEntry } = usePetStore();
  
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [mood, setMood] = useState<MoodType | undefined>(undefined);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [weather, setWeather] = useState<WeatherType | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [healthStatus, setHealthStatus] = useState('');
  
  const moods: MoodType[] = ['happy', 'playful', 'calm', 'tired', 'sick', 'anxious'];
  const activityOptions: ActivityType[] = ['walk', 'play', 'training', 'grooming', 'vet', 'medication', 'food', 'rest'];
  const weatherOptions: WeatherType[] = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
  
  const handleAddActivity = (activity: ActivityType) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };
  
  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };
  
  const handleSave = async () => {
  if (!content.trim()) {
    alert('Please enter some content for your journal entry.');
    return;
  }

  const entry = {
    petId: selectedPetId,
    date: Timestamp.fromDate(date),
    content,
    mood,
    activities,
    weather,
    location: location.trim() || undefined,
    photos: photos.length > 0 ? photos : undefined,
    healthStatus: healthStatus.trim() || undefined,
    createdAt: Timestamp.now(),
  };

  try {
    await addDoc(collection(db, 'journalEntries'), entry);
    addJournalEntry(entry); // keep local store in sync
    router.back();
  } catch (error) {
    console.error('Error saving journal entry:', error);
    alert('Failed to save entry. Please try again.');
  }
};
  
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.dateContainer}>
          <Calendar size={18} color={colors.darkGray} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        <TextInput
          style={styles.contentInput}
          placeholder="What did your pet do today?"
          placeholderTextColor={colors.darkGray}
          multiline
          value={content}
          onChangeText={setContent}
        />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mood</Text>
          <View style={styles.moodContainer}>
            {moods.map((moodOption) => (
              <TouchableOpacity
                key={moodOption}
                style={[
                  styles.moodButton,
                  mood === moodOption && styles.selectedMoodButton
                ]}
                onPress={() => setMood(mood === moodOption ? undefined : moodOption)}
              >
                <Text style={[
                  styles.moodButtonText,
                  mood === moodOption && styles.selectedMoodButtonText
                ]}>
                  {moodOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Activities</Text>
          <View style={styles.activitiesContainer}>
            {activityOptions.map((activity) => (
              <TouchableOpacity
                key={activity}
                style={[
                  styles.activityButton,
                  activities.includes(activity) && styles.selectedActivityButton
                ]}
                onPress={() => handleAddActivity(activity)}
              >
                <Text style={[
                  styles.activityButtonText,
                  activities.includes(activity) && styles.selectedActivityButtonText
                ]}>
                  {activity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <View style={styles.weatherContainer}>
            {weatherOptions.map((weatherOption) => (
              <TouchableOpacity
                key={weatherOption}
                style={[
                  styles.weatherButton,
                  weather === weatherOption && styles.selectedWeatherButton
                ]}
                onPress={() => setWeather(weather === weatherOption ? undefined : weatherOption)}
              >
                <Text style={[
                  styles.weatherButtonText,
                  weather === weatherOption && styles.selectedWeatherButtonText
                ]}>
                  {weatherOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationInputContainer}>
            <MapPin size={18} color={colors.darkGray} />
            <TextInput
              style={styles.locationInput}
              placeholder="Add a location"
              placeholderTextColor={colors.darkGray}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Health Status</Text>
          <TextInput
            style={styles.healthInput}
            placeholder="How is your pet feeling today?"
            placeholderTextColor={colors.darkGray}
            value={healthStatus}
            onChangeText={setHealthStatus}
          />
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <TouchableOpacity 
                  style={styles.removePhotoButton}
                  onPress={() => setPhotos(photos.filter((_, i) => i !== index))}
                >
                  <X size={16} color={colors.whiteFur} />
                </TouchableOpacity>
                <Image
                  source={{ uri: photo }}
                  style={styles.photoPreview}
                />
              </View>
            ))}
            <TouchableOpacity 
              style={styles.addPhotoButton}
              onPress={handleAddPhoto}
            >
              <Camera size={24} color={colors.darkGray} />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFur,
  },
  contentContainer: {
    padding: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dateText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.darkGray,
  },
  contentInput: {
    ...fonts.regular,
    fontSize: 18,
    color: colors.baileyBlack,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 24,
    padding: 0,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  selectedMoodButton: {
    backgroundColor: colors.skyEyeBlue,
  },
  moodButtonText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  selectedMoodButtonText: {
    color: colors.whiteFur,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  selectedActivityButton: {
    backgroundColor: colors.accentGreen,
  },
  activityButtonText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  selectedActivityButtonText: {
    color: colors.whiteFur,
  },
  weatherContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  weatherButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  selectedWeatherButton: {
    backgroundColor: colors.skyEyeBlue,
  },
  weatherButtonText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  selectedWeatherButtonText: {
    color: colors.whiteFur,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  locationInput: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    flex: 1,
  },
  healthInput: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    ...fonts.medium,
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.skyEyeBlue,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
});