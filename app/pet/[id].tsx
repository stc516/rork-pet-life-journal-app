import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { Calendar, Edit, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PetProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { pets, updatePet, deletePet } = usePetStore();
  
  const [pet, setPet] = useState(pets.find(p => p.id === id));
  
  useEffect(() => {
    setPet(pets.find(p => p.id === id));
  }, [id, pets]);
  
  if (!pet) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Pet not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const handleUpdatePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      updatePet(pet.id, { profileImage: result.assets[0].uri });
    }
  };
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Pet",
      `Are you sure you want to delete ${pet.name}? This will also delete all journal entries, medical records, and reminders for this pet.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deletePet(pet.id);
            router.back();
          }
        }
      ]
    );
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
    
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const calculateAge = (birthdate?: Date) => {
    if (!birthdate) return 'Unknown';
    
    const today = new Date();
    const birth = new Date(birthdate);
    
    let years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
    }
    
    return years === 0 
      ? `${Math.max(0, months)} months` 
      : `${years} ${years === 1 ? 'year' : 'years'}`;
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <TouchableOpacity 
          style={styles.profileImageContainer}
          onPress={handleUpdatePhoto}
        >
          {pet.profileImage ? (
            <Image
              source={{ uri: pet.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                {pet.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.editOverlay}>
            <Edit size={20} color={colors.whiteFur} />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petBreed}>{pet.breed || pet.species}</Text>
      </View>
      
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Species</Text>
          <Text style={styles.infoValue}>{pet.species}</Text>
        </View>
        
        {pet.breed && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Breed</Text>
            <Text style={styles.infoValue}>{pet.breed}</Text>
          </View>
        )}
        
        {pet.birthdate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Birthdate</Text>
            <Text style={styles.infoValue}>{formatDate(pet.birthdate)}</Text>
          </View>
        )}
        
        {pet.birthdate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{calculateAge(pet.birthdate)}</Text>
          </View>
        )}
        
        {pet.adoptionDate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Adoption Date</Text>
            <Text style={styles.infoValue}>{formatDate(pet.adoptionDate)}</Text>
          </View>
        )}
        
        {pet.color && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Color</Text>
            <Text style={styles.infoValue}>{pet.color}</Text>
          </View>
        )}
        
        {pet.weight && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{pet.weight} lbs</Text>
          </View>
        )}
      </View>
      
      {pet.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notesText}>{pet.notes}</Text>
        </View>
      )}
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            // In a real app, this would navigate to an edit screen
            Alert.alert("Edit", "Edit functionality would be implemented here");
          }}
        >
          <Edit size={20} color={colors.whiteFur} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Trash2 size={20} color={colors.whiteFur} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFur,
  },
  contentContainer: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    ...fonts.bold,
    fontSize: 48,
    color: colors.darkGray,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.skyEyeBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.whiteFur,
  },
  petName: {
    ...fonts.bold,
    fontSize: 28,
    color: colors.baileyBlack,
    marginBottom: 4,
  },
  petBreed: {
    ...fonts.regular,
    fontSize: 18,
    color: colors.darkGray,
  },
  infoSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  infoLabel: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.darkGray,
  },
  infoValue: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  notesSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 12,
  },
  notesText: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    lineHeight: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyEyeBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.skyEyeBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
});