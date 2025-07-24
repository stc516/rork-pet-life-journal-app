import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';

export default function FloatingActionButton() {
  return (
    <TouchableOpacity>
      <Icon name="plus" size={24} color="black" />
    </TouchableOpacity>
  );
}
