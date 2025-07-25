import { app } from '@/lib/firebaseConfig';import React from 'react';
import { View, Text } from 'react-native';
import Icon from '@/components/Icon';

export default function MedicalScreen() {
  return (
    <View>
      <Text>Medical</Text>
      <Icon name="paw" size={24} color="black" />
    </View>
  );
}
