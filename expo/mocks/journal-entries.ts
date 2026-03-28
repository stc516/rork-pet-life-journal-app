import { JournalEntry } from '@/types/pet';

export const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    petId: '1',
    date: new Date('2023-06-01'),
    content: "Bailey had the best day at the dog park today! He made friends with a Malamute and they chased each other for almost an hour. He's completely tired out now, sleeping soundly at my feet.",
    mood: 'happy',
    activities: ['walk', 'play'],
    weather: 'sunny',
    location: 'Central Park',
    photos: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590419690008-905895e8fe0d?q=80&w=1287&auto=format&fit=crop'
    ],
    healthStatus: 'excellent'
  },
  {
    id: '2',
    petId: '1',
    date: new Date('2023-05-28'),
    content: "Bailey seemed a bit under the weather today. He didn't eat his breakfast and was less energetic on our morning walk. I'll keep an eye on him and call the vet if he doesn't improve by tomorrow.",
    mood: 'tired',
    activities: ['rest'],
    weather: 'rainy',
    healthStatus: 'concerned'
  },
  {
    id: '3',
    petId: '2',
    date: new Date('2023-06-02'),
    content: "Maggie had her first swimming lesson today! She was hesitant at first but quickly took to the water like a natural. The instructor was impressed with how quickly she learned to paddle.",
    mood: 'playful',
    activities: ['training'],
    weather: 'sunny',
    location: 'Doggy Paddle Swim School',
    photos: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=1160&auto=format&fit=crop'
    ],
    healthStatus: 'excellent'
  }
];