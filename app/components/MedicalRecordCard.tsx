import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { MedicalRecord } from '@/types/pet';
import { Calendar, Clock } from 'lucide-react-native';

type MedicalRecordCardProps = {
  record: MedicalRecord;
  onPress: (record: MedicalRecord) => void;
};

export const MedicalRecordCard = ({ record, onPress }: MedicalRecordCardProps) => {
  const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedFollowUpDate = record.followUpDate 
    ? new Date(record.followUpDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(record)}
    >
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <View style={[styles.typeIndicator, getTypeStyle(record.type)]} />
          <Text style={styles.type}>{capitalizeFirstLetter(record.type)}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Calendar size={16} color={colors.darkGray} />
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{record.title}</Text>
      
      {record.notes && (
        <Text style={styles.notes}>{record.notes}</Text>
      )}
      
      {record.provider && (
        <Text style={styles.provider}>{record.provider}</Text>
      )}
      
      {formattedFollowUpDate && (
        <View style={styles.followUpContainer}>
          <Clock size={16} color={colors.skyEyeBlue} />
          <Text style={styles.followUpText}>
            Follow-up: {formattedFollowUpDate}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getTypeStyle = (type: MedicalRecord['type']) => {
  switch (type) {
    case 'checkup':
      return styles.checkupType;
    case 'vaccination':
      return styles.vaccinationType;
    case 'medication':
      return styles.medicationType;
    case 'surgery':
      return styles.surgeryType;
    default:
      return styles.otherType;
  }
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteFur,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkupType: {
    backgroundColor: colors.skyEyeBlue,
  },
  vaccinationType: {
    backgroundColor: colors.accentGreen,
  },
  medicationType: {
    backgroundColor: '#FFC107', // Amber
  },
  surgeryType: {
    backgroundColor: '#F44336', // Red
  },
  otherType: {
    backgroundColor: colors.darkGray,
  },
  type: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.baileyBlack,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  title: {
    ...fonts.semiBold,
    fontSize: 18,
    color: colors.baileyBlack,
    marginBottom: 8,
  },
  notes: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.baileyBlack,
    marginBottom: 12,
    lineHeight: 20,
  },
  provider: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 12,
  },
  followUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  followUpText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.skyEyeBlue,
  },
});