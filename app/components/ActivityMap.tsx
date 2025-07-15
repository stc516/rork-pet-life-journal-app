import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { Coordinate } from '@/types/pet';
import { Platform } from 'react-native';

type ActivityMapProps = {
  route: Coordinate[];
  height?: number;
};

export const ActivityMap = ({ route, height = 200 }: ActivityMapProps) => {
  // On web, we'll show a placeholder since we can't use react-native-maps
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.placeholderText}>
          Map view is only available on mobile devices
        </Text>
      </View>
    );
  }

  // This is a placeholder for the actual map implementation
  // In a real app, you would use react-native-maps here
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.placeholderText}>
        Map showing route with {route.length} points
      </Text>
      <Text style={styles.placeholderSubtext}>
        From ({route[0].latitude.toFixed(4)}, {route[0].longitude.toFixed(4)})
        to ({route[route.length - 1].latitude.toFixed(4)}, {route[route.length - 1].longitude.toFixed(4)})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.baileyBlack,
    textAlign: 'center',
    padding: 16,
  },
  placeholderSubtext: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
  },
});