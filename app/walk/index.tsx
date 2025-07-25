import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';

export default function WalkScreen() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [walkEnded, setWalkEnded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerOn) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndWalk = () => {
    setTimerOn(false);
    setWalkEnded(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🐾 Walk Tracker</Text>

      <Text style={styles.timer}>{formatTime(time)}</Text>

      <Text style={styles.label}>Your Location:</Text>
      <Text style={styles.value}>📍 Mock Location (San Diego, CA)</Text>

      <Text style={styles.label}>Search Trail:</Text>
      <TextInput placeholder="Search for a trail..." style={styles.input} />

      {walkEnded ? (
        <>
          <Text style={styles.summary}>Walk Summary</Text>
          <Text style={styles.value}>⏱ Duration: {formatTime(time)}</Text>
          <Text style={styles.value}>🚶‍♂️ Distance: 0.9 miles (mock)</Text>
          <Text style={styles.value}>🔥 Calories: 50 kcal (mock)</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Return Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEndWalk}>
          <Text style={styles.buttonText}>End Walk</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  timer: { fontSize: 48, fontWeight: 'bold', color: '#333', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  value: { fontSize: 16, marginBottom: 8 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 24,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#FF9C7B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  summary: { fontSize: 20, fontWeight: 'bold', marginTop: 32, marginBottom: 12 },
});

