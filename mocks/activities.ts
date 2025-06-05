import { ActivityRecord } from '@/types/pet';

export const mockActivities: ActivityRecord[] = [
  {
    id: '1',
    petId: '1',
    title: 'Morning Walk in the Park',
    date: new Date('2023-06-01T08:30:00'),
    type: 'walk',
    duration: 1800, // 30 minutes
    distance: 2500, // 2.5 km
    route: [
      { latitude: 40.7128, longitude: -74.0060, timestamp: 1622536200000 },
      { latitude: 40.7130, longitude: -74.0065, timestamp: 1622536500000 },
      { latitude: 40.7135, longitude: -74.0070, timestamp: 1622536800000 },
      { latitude: 40.7140, longitude: -74.0075, timestamp: 1622537100000 },
      { latitude: 40.7145, longitude: -74.0080, timestamp: 1622537400000 },
      { latitude: 40.7150, longitude: -74.0085, timestamp: 1622537700000 },
      { latitude: 40.7155, longitude: -74.0090, timestamp: 1622538000000 },
    ],
    avgPace: 12, // 12 min/km
    notes: "Bailey enjoyed chasing squirrels and meeting other dogs. He was full of energy today!",
    weather: 'sunny',
    photos: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=1287&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    petId: '1',
    title: 'Evening Run',
    date: new Date('2023-05-29T18:00:00'),
    type: 'run',
    duration: 2400, // 40 minutes
    distance: 4000, // 4 km
    route: [
      { latitude: 40.7128, longitude: -74.0060, timestamp: 1622307600000 },
      { latitude: 40.7135, longitude: -74.0070, timestamp: 1622308200000 },
      { latitude: 40.7145, longitude: -74.0080, timestamp: 1622308800000 },
      { latitude: 40.7155, longitude: -74.0090, timestamp: 1622309400000 },
      { latitude: 40.7165, longitude: -74.0100, timestamp: 1622310000000 },
    ],
    avgPace: 10, // 10 min/km
    weather: 'cloudy',
  },
  {
    id: '3',
    petId: '2',
    title: 'Beach Day',
    date: new Date('2023-06-02T10:00:00'),
    type: 'play',
    duration: 3600, // 60 minutes
    distance: 1500, // 1.5 km
    route: [
      { latitude: 34.0522, longitude: -118.2437, timestamp: 1622628000000 },
      { latitude: 34.0525, longitude: -118.2440, timestamp: 1622629800000 },
      { latitude: 34.0528, longitude: -118.2443, timestamp: 1622631600000 },
    ],
    avgPace: 40, // 40 min/km (slow pace due to play)
    notes: "Maggie loved playing fetch in the water. She made friends with a Labrador.",
    weather: 'sunny',
    photos: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=1160&auto=format&fit=crop'
    ]
  }
];