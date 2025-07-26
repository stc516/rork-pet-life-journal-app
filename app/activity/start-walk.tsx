import { app } from '../lib/firebaseConfig';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function StartWalk() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [trail, setTrail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSave = () => {
    // TODO: Save walk data to Firebase
    alert('Walk saved! 🚶‍♂️');
    router.push('/'); // Go back to Home
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Walk in Progress</Text>

      <View style={styles.avatarRow}>
        {/* Replace with actual pet avatars */}
        <Image source={require('@/assets/avatar1.png')} style={styles.avatar} />
        <Image source={require('@/assets/avatar2.png')} style={styles.avatar} />
      </View>

      <Text style={styles.timer}>{formatTime(timer)}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 37.7749,
          longitude: location?.longitude || -122.4194,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}
      </MapView>

      <TextInput
        placeholder="Trail name (optional)"
        style={styles.input}
        value={trail}
        onChangeText={setTrail}
      />

      <TextInput
        placeholder="Notes"
        style={[styles.input, { height: 80 }]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isWalking ? '#ccc' : '#4CAF50' }]}
        onPress={() => setIsWalking((prev) => !prev)}
      >
        <Text style={styles.buttonText}>{isWalking ? 'Pause Walk' : 'Start Walk'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Walk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  avatarRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16, gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  timer: { fontSize: 32, fontWeight: '600', textAlign: 'center', marginVertical: 12 },
  map: { height: 200, borderRadius: 12, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  saveButton: {
    backgroundColor: '#007aff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

