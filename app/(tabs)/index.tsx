import React from 'react';
import { View } from 'react-native';
import Icon from '../components/Icon';

export default function HomeScreen() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="pencil" size={24} color="black" />
      <Icon name="map" size={24} color="black" />
      <Icon name="plus" size={24} color="black" />
      <Icon name="paw" size={24} color="black" />
    </View>
  );
}
