import { app } from '@/lib/firebaseConfig';import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../components/Icon';

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
      <Icon name="gear" size={24} color="black" />
    </View>
  );
}
