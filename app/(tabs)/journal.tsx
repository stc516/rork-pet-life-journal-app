import { app } from '@/lib/firebaseConfig';import React from 'react';
import { View } from 'react-native';
import Icon from '../components/Icon';

export default function JournalScreen() {
  return (
    <View>
      <Icon name="book" size={24} color="black" />
      <Icon name="filter" size={24} color="black" />
    </View>
  );
}
