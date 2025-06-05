import { Reminder } from '@/types/pet';

export const mockReminders: Reminder[] = [
  {
    id: '1',
    petId: '1',
    title: 'Heartworm Medication',
    date: new Date('2023-06-15'),
    type: 'medication',
    recurring: 'monthly',
    notes: 'Give with food in the morning',
    completed: false
  },
  {
    id: '2',
    petId: '1',
    title: 'Bailey\'s Birthday',
    date: new Date('2023-05-15'),
    type: 'birthday',
    recurring: 'yearly',
    notes: 'Get special dog-friendly cake from Pup Bakery',
    completed: true
  },
  {
    id: '3',
    petId: '2',
    title: 'Grooming Appointment',
    date: new Date('2023-06-20'),
    type: 'grooming',
    recurring: 'none',
    notes: 'At Fluffy Paws Grooming, 10:00 AM',
    completed: false
  },
  {
    id: '4',
    petId: '2',
    title: 'Vet Checkup',
    date: new Date('2023-07-05'),
    type: 'checkup',
    recurring: 'none',
    notes: 'Annual wellness exam with Dr. Johnson',
    completed: false
  }
];