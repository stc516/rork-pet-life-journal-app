import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReminderBlock() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have upcoming reminders!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fffae6' },
  text: { fontSize: 16, fontWeight: '500' },
});

