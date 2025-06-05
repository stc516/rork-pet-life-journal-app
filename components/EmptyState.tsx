import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

type EmptyStateProps = {
  title: string;
  message: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
};

export const EmptyState = ({ title, message, icon, style }: EmptyStateProps) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    ...fonts.semiBold,
    fontSize: 20,
    color: colors.baileyBlack,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    ...fonts.regular,
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
});