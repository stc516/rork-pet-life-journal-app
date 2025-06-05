import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { ActivityMap } from '@/components/ActivityMap';
import { Calendar, Clock, Edit, MapPin, Ruler, Trash2 } from 'lucide-react-native';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities, deleteActivity, pets } = usePetStore();
  
  const activity = activities.find(activity => activity.id === id);
  
  if (!activity) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Activity not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const pet = pets.find(pet => pet.id === activity.petId);
  
  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formattedTime = new Date(activity.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} kilometers`;
    }
    return `${meters} meters`;
  };
  
  const formatPace = (pace?: number) => {
    if (!pace) return 'Not available';
    
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')} min/km`;
  };
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity record?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteActivity(activity.id);
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
        <Text style={styles.title}>{activity.title}</Text>
        <View style={styles.dateTimeContainer}>
          <Calendar size={16} color={colors.darkGray} />
          <Text style={styles.dateTimeText}>{formattedDate} at {formattedTime}</Text>
        </View>
        
        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Type:</Text>
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{activity.type}</Text>
          </View>
          
          {activity.weather && (
            <View style={styles.weatherTag}>
              <Text style={styles.weatherText}>{activity.weather}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Clock size={24} color={colors.skyEyeBlue} />
          <Text style={styles.statValue}>{formatDuration(activity.duration)}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Ruler size={24} color={colors.skyEyeBlue} />
          <Text style={styles.statValue}>{formatDistance(activity.distance)}</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <MapPin size={24} color={colors.skyEyeBlue} />
          <Text style={styles.statValue}>{formatPace(activity.avgPace)}</Text>
          <Text style={styles.statLabel}>Average Pace</Text>
        </View>
      </View>
      
      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Route</Text>
        <ActivityMap route={activity.route} height={250} />
      </View>
      
      {activity.photos && activity.photos.length > 0 && (
        <View style={styles.photosContainer}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activity.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                style={styles.photo}
              />
            ))}
          </ScrollView>
        </View>
      )}
      
      {activity.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notes}>{activity.notes}</Text>
        </View>
      )}
      
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
    marginBottom: 24,
  },
  title: {
    ...fonts.bold,
    fontSize: 24,
    color: colors.baileyBlack,
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dateTimeText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.darkGray,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  typeLabel: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.darkGray,
    marginRight: 8,
  },
  typeTag: {
    backgroundColor: colors.skyEyeBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  typeText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.whiteFur,
  },
  weatherTag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  weatherText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.mediumGray,
  },
  statValue: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
  },
  mapContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 12,
  },
  photosContainer: {
    marginBottom: 24,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginRight: 12,
  },
  notesContainer: {
    marginBottom: 24,
  },
  notes: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    lineHeight: 24,
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