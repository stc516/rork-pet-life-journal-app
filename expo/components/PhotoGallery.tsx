import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

type PhotoGalleryProps = {
  photos: string[];
  onPhotoPress: (index: number) => void;
};

export const PhotoGallery = ({ photos, onPhotoPress }: PhotoGalleryProps) => {
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 48) / 3; // 3 images per row with padding

  return (
    <View style={styles.container}>
      {photos.length > 0 ? (
        <View style={styles.grid}>
          {photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.imageContainer, { width: imageSize, height: imageSize }]}
              onPress={() => onPhotoPress(index)}
            >
              <Image
                source={{ uri: photo }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No photos yet</Text>
          <Text style={styles.emptySubtext}>Add photos to create memories</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 8,
  },
  emptySubtext: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
});