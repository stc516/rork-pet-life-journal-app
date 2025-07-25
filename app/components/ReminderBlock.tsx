import { View, Text } from 'react-native';

export default function ReminderBlock({ petId }: { petId: string }) {
  return (
    <View style={{ padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Reminders for Pet ID: {petId}</Text>
      <Text>• 8AM - Heartworm Meds</Text>
      <Text>• 3PM - Afternoon Walk</Text>
    </View>
  );
}

