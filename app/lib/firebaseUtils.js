import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { app } from '@/lib/firebaseConfig';

const db = getFirestore(app);

export const addJournalEntry = async (entry) => {
  try {
    const docRef = await addDoc(collection(db, 'journalEntries'), entry);
    return docRef.id;
  } catch (error) {  
    console.error('Error adding journal entry:', error);
    throw error;
  }
}; 
  
export const getJournalEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'journalEntries'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
}; 
  
export const deleteJournalEntry = async (id) => {
  try {
    await deleteDoc(doc(db, 'journalEntries', id));
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
};

