import { app } from '@/lib/firebaseConfig';import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function NewActivity() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="camera" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="map-marker" size={24} color="black" />
      <Icon name="play" size={24} color="black" />
      <Icon name="stop" size={24} color="black" />
    </View>
  );
}
