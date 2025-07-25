import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 32, alignItems: 'center' },
  text: { fontSize: 16, color: '#999' },
});

