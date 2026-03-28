import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';

type Action = {
  label: string;
  icon: string;
  onPress: () => void;
};

const actions: Action[] = [
  { label: 'Start Walk', icon: 'paw', onPress: () => console.log('Walk') },
  { label: 'Journal Entry', icon: 'pencil', onPress: () => console.log('Journal') },
  { label: 'View Calendar', icon: 'calendar', onPress: () => console.log('Calendar') },
];

export default function QuickActions() {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity key={index} style={styles.action} onPress={action.onPress}>
          <Icon name={action.icon} size={24} color="#000" />
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
  },
  action: {
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },
});

