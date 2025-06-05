import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { Reminder } from '@/types/pet';
import { Calendar, Check, Clock, RotateCcw } from 'lucide-react-native';

type ReminderCardProps = {
  reminder: Reminder;
  onToggleComplete: (id: string, completed: boolean) => void;
  onPress: (reminder: Reminder) => void;
};

export const ReminderCard = ({ reminder, onToggleComplete, onPress }: ReminderCardProps) => {
  const formattedDate = new Date(reminder.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedTime = new Date(reminder.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const isOverdue = new Date(reminder.date) < new Date() && !reminder.completed;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        reminder.completed && styles.completedContainer,
        isOverdue && styles.overdueContainer,
      ]}
      onPress={() => onPress(reminder)}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          reminder.completed && styles.checkedBox,
        ]}
        onPress={() => onToggleComplete(reminder.id, !reminder.completed)}
      >
        {reminder.completed && <Check size={16} color={colors.whiteFur} />}
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            reminder.completed && styles.completedText,
          ]}>
            {reminder.title}
          </Text>
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{reminder.type}</Text>
          </View>
        </View>
        
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Calendar size={14} color={colors.darkGray} />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          
          <View style={styles.timeContainer}>
            <Clock size={14} color={colors.darkGray} />
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
          
          {reminder.recurring && reminder.recurring !== 'none' && (
            <View style={styles.recurringContainer}>
              <RotateCcw size={14} color={colors.skyEyeBlue} />
              <Text style={styles.recurringText}>{reminder.recurring}</Text>
            </View>
          )}
        </View>
        
        {reminder.notes && (
          <Text style={styles.notes}>{reminder.notes}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  completedContainer: {
    opacity: 0.7,
    backgroundColor: colors.lightGray,
  },
  overdueContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336', // Red
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.skyEyeBlue,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: colors.skyEyeBlue,
    borderColor: colors.skyEyeBlue,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...fonts.semiBold,
    fontSize: 16,
    color: colors.baileyBlack,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.darkGray,
  },
  typeTag: {
    backgroundColor: colors.skyEyeBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  typeText: {
    ...fonts.medium,
    fontSize: 12,
    color: colors.whiteFur,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.darkGray,
  },
  recurringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recurringText: {
    ...fonts.medium,
    fontSize: 14,
    color: colors.skyEyeBlue,
  },
  notes: {
    ...fonts.regular,
    fontSize: 14,
    color: colors.baileyBlack,
    marginTop: 4,
  },
});