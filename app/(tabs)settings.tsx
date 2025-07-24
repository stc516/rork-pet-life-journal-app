import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { usePetStore } from '../hooks/usePetStore';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

export default function SettingsScreen() {
  const { pets, addPet } = usePetStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFur,
    padding: 16,
  },
  header: {
    ...fonts.bold,
    fontSize: 24,
    marginBottom: 24,
    color: colors.baileyBlack,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.baileyBlack,
  },
});

