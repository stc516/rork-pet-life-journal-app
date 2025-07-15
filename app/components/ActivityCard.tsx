import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { ActivityRecord } from '@/types/pet';
import { Calendar, Clock, MapPin, Ruler } from 'lucide-react-native';

type ActivityCardProps = {
  activity: ActivityRecord;
  onPress: (activity: ActivityRecord) => void;
};

export const ActivityCard = ({ activity, onPress }: ActivityCardProps) => {
  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedTime = new Date(activity.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`;
    }
    return `${meters} m`;
  };
  
  const formatPace = (pace?: number) => {
    if (!pace) return 'N/A';
    
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')} /km`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(activity)}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={[styles.typeIndicator, getTypeStyle(activity.type)]} />
          <Text style={styles.title}>{activity.title}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Calendar size={14} color={colors.darkGray} />
          <Text style={styles.dateText}>{formattedDate} {formattedTime}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Clock size={16} color={colors.skyEyeBlue} />
          <Text style={styles.statValue}>{formatDuration(activity.duration)}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ruler size={16} color={colors.skyEyeBlue} />
          <Text style={styles.statValue}>{formatDistance(activity.distance)}</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
        
        <View style={styles.statItem}>
          <MapPin size={16} color={colors.skyEyeBlue} />
          <Text style={styles.statValue}>{formatPace(activity.avgPace)}</Text>
          <Text style={styles.statLabel}>Avg Pace</Text>
        </View>
      </View>
      
      {activity.photos && activity.photos.length > 0 && (
        <Image
          source={{ uri: activity.photos[0] }}
          style={styles.photo}
        />
      )}
      
      {activity.notes && (
        <Text style={styles.notes} numberOfLines={2}>
          {activity.notes}
        </Text>
      )}
      
      {activity.weather && (
        <View style={styles.weatherTag}>
          <Text style={styles.weatherText}>{activity.weather}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getTypeStyle = (type: ActivityRecord['type']) => {
  switch (type) {
    case 'walk':
      return styles.walkType;
    case 'run':
      return styles.runType;
    case 'hike':
      return styles.hikeType;
    case 'play':
      return styles.playType;
    default:
      return styles.otherType;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteFur,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  walkType: {
    backgroundColor: colors.skyEyeBlue,
  },
  runType: {
    backgroundColor: '#FF9800', // Orange
  },
  hikeType: {
    backgroundColor: '#4CAF50', // Green
  },
  playType: {
    backgroundColor: '#9C27B0', // Purple
  },
  otherType: {
    backgroundColor: colors.darkGray,
  },
  title: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
    marginTop: 4,
  },
  statLabel: {
    ...fonts.regular,
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 2,
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  notes: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.baileyBlack,
    marginBottom: 12,
  },
  weatherTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  weatherText: {
    ...fonts.medium,
    fontSize: 12,
    color: colors.baileyBlack,
  },
});