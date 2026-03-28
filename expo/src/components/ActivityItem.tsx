import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivityItem({ label }: { label: string }) {
  return (
    <View style={styles.item}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#e0f7fa',
    borderRadius: 6,
    marginBottom: 8,
  },
});

