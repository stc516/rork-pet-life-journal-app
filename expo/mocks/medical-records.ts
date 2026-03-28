import { MedicalRecord } from '@/types/pet';

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    petId: '1',
    date: new Date('2023-04-15'),
    type: 'checkup',
    title: 'Annual Wellness Exam',
    notes: 'Bailey is in excellent health. Weight is appropriate for his age and breed. All vitals normal.',
    provider: 'Dr. Smith at City Vet Clinic',
    followUpDate: new Date('2024-04-15')
  },
  {
    id: '2',
    petId: '1',
    date: new Date('2023-04-15'),
    type: 'vaccination',
    title: 'Rabies Vaccination',
    notes: 'Three-year rabies vaccination administered. No adverse reactions.',
    provider: 'Dr. Smith at City Vet Clinic',
    followUpDate: new Date('2026-04-15')
  },
  {
    id: '3',
    petId: '2',
    date: new Date('2023-05-10'),
    type: 'medication',
    title: 'Heartworm Preventative',
    notes: 'Monthly heartworm preventative prescribed. Administer on the 10th of each month.',
    provider: 'Dr. Johnson at Pawsome Pet Care',
    followUpDate: new Date('2023-06-10')
  }
];