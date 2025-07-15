import { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { app } from '../app/firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const db = getFirestore(app);

export default function NewJournalEntry() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const querySnapshot = await getDocs(collection(db, 'journalEntries'));
    const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEntries(fetched);
  };

  const saveEntry = async () => {
    if (!entry.trim()) return;
    await addDoc(collection(db, 'journalEntries'), {
      text: entry,
      timestamp: new Date().toISOString()
    });
    setEntry('');
    fetchEntries();
  };

  const deleteEntry = async (id: string) => {
    await deleteDoc(doc(db, 'journalEntries', id));
    fetchEntries();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your journal entry"
        value={entry}
        onChangeText={setEntry}
        style={styles.input}
        multiline
      />
      <Button title="Save Entry" onPress={saveEntry} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.text}</Text>
            <Button title="Delete" onPress={() => deleteEntry(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, minHeight: 80 },
  entry: { marginVertical: 10 }
});
