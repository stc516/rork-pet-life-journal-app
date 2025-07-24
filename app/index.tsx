import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { usePetStore } from '../hooks/usePetStore';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

export default function PetListScreen() {
  const { pets } = usePetStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Pets</Text>
      <FlatList
        data={pets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/pets/${item.name}`)} // Update later with pet detail routing
          >
            <Image
              source={
                item.profileImage
                  ? { uri: item.profileImage }
                  : require('../assets/images/pet-placeholder.png') // Add this fallback asset
              }
              style={styles.image}
            />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.species}>{item.species}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No pets yet. Add one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.whiteFur,
  },
  title: {
    ...fonts.semiBold,
    fontSize: 24,
    marginBottom: 16,
    color: colors.baileyBlack,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  name: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
  },
  species: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  empty: {
    ...fonts.regular,
    fontSize: 16,
    textAlign: 'center',
    color: colors.darkGray,
    marginTop: 20,
  },
});	
