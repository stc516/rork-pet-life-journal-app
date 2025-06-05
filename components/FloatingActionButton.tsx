import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { Plus } from 'lucide-react-native';

type FloatingActionButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

export const FloatingActionButton = ({ onPress, style }: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Plus size={24} color={colors.whiteFur} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.skyEyeBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.baileyBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});