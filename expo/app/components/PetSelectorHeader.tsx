import { app } from '../lib/firebaseConfig';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const mockPets = [
  { id: '1', name: 'Bailey' },
  { id: '2', name: 'Meiomi' },
];

export default function PetSelectorHeader({ onSelectPet }: { onSelectPet: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
      {mockPets.map((pet) => (
        <TouchableOpacity
          key={pet.id}
          onPress={() => {
            setSelected(pet.id);
            onSelectPet(pet.id);
          }}
          style={{
            padding: 10,
            backgroundColor: selected === pet.id ? '#ffa' : '#eee',
            borderRadius: 8,
            marginRight: 10,
          }}
        >
          <Text>{pet.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

