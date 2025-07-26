import { app } from '../lib/firebaseConfig';
import { View, TouchableOpacity, Text } from 'react-native';

const actions = ['Start Walk', 'Journal Entry', 'View Calendar'];

export default function QuickActions({ onAction }: { onAction: (action: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action}
          onPress={() => onAction(action)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: '#ddd',
            borderRadius: 20,
            marginRight: 8,
          }}
        >
          <Text>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

