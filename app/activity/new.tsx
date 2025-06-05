import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { WeatherType, Coordinate } from '@/types/pet';
import { Calendar, Camera, Clock, MapPin, Play, Stop } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { ActivityMap } from '@/components/ActivityMap';

export default function NewActivityScreen() {
  const { selectedPetId, addActivity } = usePetStore();
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'walk' | 'run' | 'hike' | 'play' | 'other'>('walk');
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [route, setRoute] = useState<Coordinate[]>([]);
  const [avgPace, setAvgPace] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [weather, setWeather] = useState<WeatherType | undefined>(undefined);
  
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const activityTypes = ['walk', 'run', 'hike', 'play', 'other'];
  const weatherOptions: WeatherType[] = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
  
  // Timer for tracking duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking) {
      interval = setInterval(() => {
        if (startTime) {
          const now = new Date();
          const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
          setElapsedTime(elapsed);
          setDuration(elapsed);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, startTime]);
  
  const handleStartTracking = () => {
    // In a real app, this would start location tracking
    // For this demo, we'll simulate it
    const now = new Date();
    setStartTime(now);
    setIsTracking(true);
    setDate(now);
    
    // Simulate route tracking with random coordinates
    const startCoord: Coordinate = {
      latitude: 40.7128,
      longitude: -74.0060,
      timestamp: now.getTime()
    };
    
    setRoute([startCoord]);
    
    // Simulate adding points to the route
    const simulateRouteInterval = setInterval(() => {
      if (!isTracking) {
        clearInterval(simulateRouteInterval);
        return;
      }
      
      setRoute(currentRoute => {
        const lastPoint = currentRoute[currentRoute.length - 1];
        const newPoint: Coordinate = {
          latitude: lastPoint.latitude + (Math.random() * 0.001 - 0.0005),
          longitude: lastPoint.longitude + (Math.random() * 0.001 - 0.0005),
          timestamp: new Date().getTime()
        };
        
        // Calculate distance (simplified)
        const newDistance = currentRoute.length * 100; // 100 meters per point
        setDistance(newDistance);
        
        // Calculate pace
        if (elapsedTime > 0) {
          const paceMinPerKm = (elapsedTime / 60) / (newDistance / 1000);
          setAvgPace(paceMinPerKm);
        }
        
        return [...currentRoute, newPoint];
      });
    }, 5000); // Add a point every 5 seconds
    
    return () => {
      clearInterval(simulateRouteInterval);
    };
  };
  
  const handleStopTracking = () => {
    setIsTracking(false);
    
    // In a real app, this would stop location tracking
    // For this demo, we'll just stop the timer
  };
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
  
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Please enter a title for this activity');
      return;
    }
    
    if (route.length < 2) {
      Alert.alert('Please record a route by starting tracking');
      return;
    }
    
    addActivity({
      petId: selectedPetId,
      title: title.trim(),
      date,
      type,
      duration,
      distance,
      route,
      avgPace,
      notes: notes.trim() || undefined,
      photos: photos.length > 0 ? photos : undefined,
      weather,
    });
    
    router.back();
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.trackingSection}>
          <Text style={styles.timerText}>{formatDuration(elapsedTime)}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{(distance / 1000).toFixed(2)} km</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avg Pace</Text>
              <Text style={styles.statValue}>
                {avgPace ? `${Math.floor(avgPace)}:${Math.round((avgPace % 1) * 60).toString().padStart(2, '0')}` : '--:--'}
              </Text>
            </View>
          </View>
          
          {route.length > 0 && (
            <View style={styles.mapPreview}>
              <ActivityMap route={route} height={150} />
            </View>
          )}
          
          <View style={styles.trackingButtons}>
            {!isTracking ? (
              <TouchableOpacity 
                style={styles.startButton}
                onPress={handleStartTracking}
              >
                <Play size={24} color={colors.whiteFur} />
                <Text style={styles.buttonText}>Start Tracking</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.stopButton}
                onPress={handleStopTracking}
              >
                <Stop size={24} color={colors.whiteFur} />
                <Text style={styles.buttonText}>Stop Tracking</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Activity title"
              placeholderTextColor={colors.darkGray}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Activity Type</Text>
            <View style={styles.typeContainer}>
              {activityTypes.map((activityType) => (
                <TouchableOpacity
                  key={activityType}
                  style={[
                    styles.typeButton,
                    type === activityType && styles.selectedTypeButton
                  ]}
                  onPress={() => setType(activityType as any)}
                >
                  <Text style={[
                    styles.typeButtonText,
                    type === activityType && styles.selectedTypeButtonText
                  ]}>
                    {activityType}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weather</Text>
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
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add notes about this activity"
              placeholderTextColor={colors.darkGray}
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Photos</Text>
            <TouchableOpacity 
              style={styles.addPhotoButton}
              onPress={handleAddPhoto}
            >
              <Camera size={24} color={colors.darkGray} />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            
            {photos.length > 0 && (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.photosContainer}
              >
                {photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={styles.photoPreview}
                  />
                ))}
              </ScrollView>
            )}
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
            disabled={isTracking}
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
  trackingSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  timerText: {
    ...fonts.bold,
    fontSize: 48,
    color: colors.baileyBlack,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 4,
  },
  statValue: {
    ...fonts.semiBold,
    fontSize: 20,
    color: colors.baileyBlack,
  },
  mapPreview: {
    width: '100%',
    marginBottom: 16,
  },
  trackingButtons: {
    width: '100%',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyEyeBlue,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.baileyBlack,
    marginBottom: 8,
  },
  input: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  selectedTypeButton: {
    backgroundColor: colors.skyEyeBlue,
  },
  typeButtonText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  selectedTypeButtonText: {
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
  notesInput: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  addPhotoText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.darkGray,
  },
  photosContainer: {
    marginTop: 12,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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