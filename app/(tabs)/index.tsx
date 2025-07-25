import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

export default function StartWalkScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/pets/bailey.png')} style={styles.avatar} />
        <Text style={styles.headerText}>Bailey's Walk</Text>
      </View>

      <MapView style={styles.map} />

      <TextInput
        placeholder="Trail name (optional)"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#eee' }]}>
        <Text style={styles.buttonTextDark}>Save Walk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  headerText: { fontSize: 18, fontWeight: '600' },
  map: { width: '100%', height: 200, borderRadius: 16, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16 },
  button: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  buttonTextDark: { color: '#000', fontWeight: '600' }
});

