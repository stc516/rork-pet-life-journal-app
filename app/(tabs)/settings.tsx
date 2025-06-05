import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { usePetStore } from '@/hooks/usePetStore';
import { 
  Bell, 
  Cloud, 
  HelpCircle, 
  Info, 
  Lock, 
  LogOut, 
  Moon, 
  Plus, 
  Settings, 
  Share2, 
  Trash2, 
  User 
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { pets, addPet } = usePetStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = React.useState(true);
  
  const handleAddPet = () => {
    router.push('/pet/new');
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Handle account deletion
            Alert.alert("Account Deleted", "Your account has been deleted.");
          }
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pets</Text>
        
        {pets.map(pet => (
          <TouchableOpacity 
            key={pet.id}
            style={styles.settingItem}
            onPress={() => router.push(`/pet/${pet.id}`)}
          >
            <Text style={styles.settingText}>{pet.name}</Text>
            <Text style={styles.settingSubtext}>{pet.breed}</Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddPet}
        >
          <Plus size={20} color={colors.skyEyeBlue} />
          <Text style={styles.addButtonText}>Add New Pet</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Bell size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.mediumGray, true: colors.skyEyeBlue }}
            thumbColor={colors.whiteFur}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Moon size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: colors.mediumGray, true: colors.skyEyeBlue }}
            thumbColor={colors.whiteFur}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Cloud size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Cloud Sync</Text>
          </View>
          <Switch
            value={cloudSyncEnabled}
            onValueChange={setCloudSyncEnabled}
            trackColor={{ false: colors.mediumGray, true: colors.skyEyeBlue }}
            thumbColor={colors.whiteFur}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <User size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Profile</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Lock size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Privacy</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Share2 size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <HelpCircle size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>Help & Support</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Info size={20} color={colors.baileyBlack} />
            <Text style={styles.settingText}>About</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.dangerSection}>
        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={handleDeleteAccount}
        >
          <Trash2 size={20} color="#F44336" />
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={colors.baileyBlack} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: colors.whiteFur,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  settingSubtext: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    gap: 8,
  },
  addButtonText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.skyEyeBlue,
  },
  dangerSection: {
    backgroundColor: colors.whiteFur,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    gap: 12,
  },
  dangerButtonText: {
    ...fonts.medium,
    fontSize: 16,
    color: '#F44336',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  logoutButtonText: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.baileyBlack,
  },
  versionText: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
});