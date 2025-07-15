import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { pickAndUploadImage } from "@/utils/uploadImage";
import PetPlaceholder from '@/assets/images/pet-placeholder.png';


export default function NewPetScreen() {
  const { addPet } = usePetStore();
  
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  const [adoptionDate, setAdoptionDate] = useState<Date | undefined>(undefined);
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const handleAddPhoto = async () => {
  try {
    const url = await pickAndUploadImage("petProfiles");
    if (url) setProfileImage(url);
  } catch (err) {
    console.error("Error uploading image:", err);
  }
};

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a name for your pet.');
      return;
    }
    
    if (!species.trim()) {
      alert('Please enter a species for your pet.');
      return;
    }
    
    addPet({
      name: name.trim(),
      species: species.trim(),
      breed: breed.trim() || undefined,
      birthdate,
      adoptionDate,
      color: color.trim() || undefined,
      weight: weight ? parseFloat(weight) : undefined,
      profileImage,
      notes: notes.trim() || undefined,
    });
    
    router.back();
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  <View style={styles.profileImageContainer}>
    {profileImage ? (
      <Image
        source={{ uri: profileImage }}
        style={styles.profileImage}
      />
    ) : (
      <View style={styles.profileImagePlaceholder}>
        <Image
          source={require('@/assets/images/pet-placeholder.png')}
          style={styles.profileImage}
        />
      </View>
    )}
          <TouchableOpacity 
            style={styles.addPhotoButton}
            onPress={handleAddPhoto}
          >
            <FontAwesome name="camera" size={20} color={colors.whiteFur} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pet's name"
              placeholderTextColor={colors.darkGray}
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Species *</Text>
            <TextInput
              style={styles.input}
              placeholder="Dog, Cat, etc."
              placeholderTextColor={colors.darkGray}
              value={species}
              onChangeText={setSpecies}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Breed</Text>
            <TextInput
              style={styles.input}
              placeholder="Breed (optional)"
              placeholderTextColor={colors.darkGray}
              value={breed}
              onChangeText={setBreed}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              placeholder="Coat color (optional)"
              placeholderTextColor={colors.darkGray}
              value={color}
              onChangeText={setColor}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (lbs)</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight in pounds (optional)"
              placeholderTextColor={colors.darkGray}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthdate</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => {
                // In a real app, this would open a date picker
                // For now, we'll just set a sample date
                setBirthdate(birthdate ? undefined : new Date(2020, 0, 1));
              }}
            >
              <FontAwesome name="calendar" size={18} color={colors.darkGray} />
              <Text style={styles.dateText}>
                {birthdate 
                  ? birthdate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Select birthdate (optional)'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adoption Date</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => {
                // In a real app, this would open a date picker
                // For now, we'll just set a sample date
                setAdoptionDate(adoptionDate ? undefined : new Date(2020, 2, 15));
              }}
            >
              <Calendar size={18} color={colors.darkGray} />
              <Text style={styles.dateText}>
                {adoptionDate 
                  ? adoptionDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Select adoption date (optional)'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Additional information about your pet (optional)"
              placeholderTextColor={colors.darkGray}
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
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
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.skyEyeBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.whiteFur,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.baileyBlack,
    marginBottom: 8,
  },
  input: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  dateText: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  notesInput: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.baileyBlack,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.skyEyeBlue,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.whiteFur,
  },
});
