import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { JournalEntry } from '@/types/pet';
import { Calendar, Cloud, MapPin } from 'lucide-react-native';

type JournalEntryCardProps = {
  entry: JournalEntry;
  onPress: (entry: JournalEntry) => void;
};

export const JournalEntryCard = ({ entry, onPress }: JournalEntryCardProps) => {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Truncate content if it's too long
  const truncatedContent = entry.content.length > 120
    ? `${entry.content.substring(0, 120)}...`
    : entry.content;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(entry)}
    >
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Calendar size={16} color={colors.darkGray} />
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
      
      <Text style={styles.content}>{truncatedContent}</Text>
      
      {entry.photos && entry.photos.length > 0 && (
        <View style={styles.photoContainer}>
          {entry.photos.slice(0, 3).map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photo}
            />
          ))}
          {entry.photos.length > 3 && (
            <View style={styles.morePhotosContainer}>
              <Text style={styles.morePhotosText}>+{entry.photos.length - 3}</Text>
            </View>
          )}
        </View>
      )}
      
      {entry.activities && entry.activities.length > 0 && (
        <View style={styles.tagsContainer}>
          {entry.activities.map((activity) => (
            <View key={activity} style={styles.tag}>
              <Text style={styles.tagText}>{activity}</Text>
            </View>
          ))}
          {entry.mood && (
            <View style={[styles.tag, styles.moodTag]}>
              <Text style={styles.tagText}>{entry.mood}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.darkGray,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...fonts.regular,
    fontSize: 12,
    color: colors.darkGray,
  },
  content: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    marginBottom: 16,
    lineHeight: 22,
  },
  photoContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  morePhotosContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  morePhotosText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  tagText: {
    ...fonts.medium,
    fontSize: 12,
    color: colors.baileyBlack,
  },
});