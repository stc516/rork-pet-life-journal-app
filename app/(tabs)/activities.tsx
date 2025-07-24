import { app } from '@/lib/firebaseConfig';import React from 'react';
import { View } from 'react-native';
import Icon from '../components/Icon';

export default function ActivitiesScreen() {
  return (
    <View>
      <Icon name="map" size={24} color="black" />
    </View>
  );
}
