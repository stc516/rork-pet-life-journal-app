import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle | TextStyle;
};

export default function AppIcon({ name, size = 24, color = '#000', style }: IconProps) {
  return <Icon name={name} size={size} color={color} style={style} />;
}

