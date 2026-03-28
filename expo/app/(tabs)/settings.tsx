import { app } from '../lib/firebaseConfig';
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Icon name="cog" size={24} color={colors.darkGray} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.whiteFur,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: fonts.primary,
    color: colors.blackFur,
  },
});

