import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = 'black' }: IconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

