import { create } from 'zustand';
import { Pet, JournalEntry, MedicalRecord, Reminder, ActivityRecord } from '@/types/pet';
import { mockPets } from '@/mocks/pets';
import { mockJournalEntries } from '@/mocks/journal-entries';
import { mockMedicalRecords } from '@/mocks/medical-records';
import { mockReminders } from '@/mocks/reminders';
import { mockActivities } from '@/mocks/activities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type PetStore = {
  pets: Pet[];
  selectedPetId: string;
  journalEntries: JournalEntry[];
  medicalRecords: MedicalRecord[];
  reminders: Reminder[];
  activities: ActivityRecord[];
  
  // Pet actions
  selectPet: (petId: string) => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  
  // Journal actions
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
  
  // Medical record actions
  addMedicalRecord: (record: Omit<MedicalRecord, 'id'>) => void;
  updateMedicalRecord: (id: string, updates: Partial<MedicalRecord>) => void;
  deleteMedicalRecord: (id: string) => void;
  
  // Reminder actions
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  toggleReminderComplete: (id: string, completed: boolean) => void;
  
  // Activity actions
  addActivity: (activity: Omit<ActivityRecord, 'id'>) => void;
  updateActivity: (id: string, updates: Partial<ActivityRecord>) => void;
  deleteActivity: (id: string) => void;
};

export const usePetStore = create<PetStore>()(
  persist(
    (set) => ({
      pets: mockPets,
      selectedPetId: mockPets[0]?.id || '',
      journalEntries: mockJournalEntries,
      medicalRecords: mockMedicalRecords,
      reminders: mockReminders,
      activities: mockActivities,
      
      // Pet actions
      selectPet: (petId) => set({ selectedPetId: petId }),
      
      addPet: (pet) => set((state) => {
        const newPet = { ...pet, id: Date.now().toString() };
        return { 
          pets: [...state.pets, newPet],
          selectedPetId: state.pets.length === 0 ? newPet.id : state.selectedPetId
        };
      }),
      
      updatePet: (id, updates) => set((state) => ({
        pets: state.pets.map((pet) => 
          pet.id === id ? { ...pet, ...updates } : pet
        ),
      })),
      
      deletePet: (id) => set((state) => {
        const newPets = state.pets.filter((pet) => pet.id !== id);
        return {
          pets: newPets,
          selectedPetId: state.selectedPetId === id 
            ? (newPets[0]?.id || '') 
            : state.selectedPetId,
          journalEntries: state.journalEntries.filter(
            (entry) => entry.petId !== id
          ),
          medicalRecords: state.medicalRecords.filter(
            (record) => record.petId !== id
          ),
          reminders: state.reminders.filter(
            (reminder) => reminder.petId !== id
          ),
          activities: state.activities.filter(
            (activity) => activity.petId !== id
          ),
        };
      }),
      
      // Journal actions
      addJournalEntry: (entry) => set((state) => ({
        journalEntries: [
          { ...entry, id: Date.now().toString() },
          ...state.journalEntries,
        ],
      })),
      
      updateJournalEntry: (id, updates) => set((state) => ({
        journalEntries: state.journalEntries.map((entry) =>
          entry.id === id ? { ...entry, ...updates } : entry
        ),
      })),
      
      deleteJournalEntry: (id) => set((state) => ({
        journalEntries: state.journalEntries.filter(
          (entry) => entry.id !== id
        ),
      })),
      
      // Medical record actions
      addMedicalRecord: (record) => set((state) => ({
        medicalRecords: [
          { ...record, id: Date.now().toString() },
          ...state.medicalRecords,
        ],
      })),
      
      updateMedicalRecord: (id, updates) => set((state) => ({
        medicalRecords: state.medicalRecords.map((record) =>
          record.id === id ? { ...record, ...updates } : record
        ),
      })),
      
      deleteMedicalRecord: (id) => set((state) => ({
        medicalRecords: state.medicalRecords.filter(
          (record) => record.id !== id
        ),
      })),
      
      // Reminder actions
      addReminder: (reminder) => set((state) => ({
        reminders: [
          { ...reminder, id: Date.now().toString() },
          ...state.reminders,
        ],
      })),
      
      updateReminder: (id, updates) => set((state) => ({
        reminders: state.reminders.map((reminder) =>
          reminder.id === id ? { ...reminder, ...updates } : reminder
        ),
      })),
      
      deleteReminder: (id) => set((state) => ({
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== id
        ),
      })),
      
      toggleReminderComplete: (id, completed) => set((state) => ({
        reminders: state.reminders.map((reminder) =>
          reminder.id === id ? { ...reminder, completed } : reminder
        ),
      })),
      
      // Activity actions
      addActivity: (activity) => set((state) => ({
        activities: [
          { ...activity, id: Date.now().toString() },
          ...state.activities,
        ],
      })),
      
      updateActivity: (id, updates) => set((state) => ({
        activities: state.activities.map((activity) =>
          activity.id === id ? { ...activity, ...updates } : activity
        ),
      })),
      
      deleteActivity: (id) => set((state) => ({
        activities: state.activities.filter(
          (activity) => activity.id !== id
        ),
      })),
    }),
    {
      name: 'pet-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);