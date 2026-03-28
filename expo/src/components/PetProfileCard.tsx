import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PetProfileCard({ name, photoUrl }: { name: string, photoUrl?: string }) {
  return (
    <View style={styles.card}>
      {photoUrl && <Image source={{ uri: photoUrl }} style={styles.img} />}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, alignItems: 'center' },
  img: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  name: { fontSize: 14 },
});

