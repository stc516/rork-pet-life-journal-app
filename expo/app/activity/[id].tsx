import { app } from '../lib/firebaseConfig';
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function ActivityDetail() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="pencil" size={24} color="black" />
      <Icon name="map-marker" size={24} color="black" />
      <Icon name="ruler" size={24} color="black" />
      <Icon name="trash-can" size={24} color="black" />
    </View>
  );
}
