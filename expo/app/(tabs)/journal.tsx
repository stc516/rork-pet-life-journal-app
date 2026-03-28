import { app } from '../lib/firebaseConfig';
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

export default function JournalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Journal</Text>
      {/* Add your journal content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
});

