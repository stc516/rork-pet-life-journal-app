export type MoodType = 'happy' | 'playful' | 'calm' | 'tired' | 'sick' | 'anxious';

export type ActivityType = 
  | 'walk' 
  | 'play' 
  | 'training' 
  | 'grooming' 
  | 'vet' 
  | 'medication' 
  | 'food' 
  | 'rest';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';

export type JournalEntry = {
  id: string;
  petId: string;
  date: Date;
  content: string;
  mood?: MoodType;
  activities?: ActivityType[];
  weather?: WeatherType;
  location?: string;
  photos?: string[];
  healthStatus?: string;
};

export type MedicalRecord = {
  id: string;
  petId: string;
  date: Date;
  type: 'checkup' | 'vaccination' | 'medication' | 'surgery' | 'other';
  title: string;
  notes?: string;
  provider?: string;
  documents?: string[];
  followUpDate?: Date;
};

export type Reminder = {
  id: string;
  petId: string;
  title: string;
  date: Date;
  type: 'medication' | 'checkup' | 'grooming' | 'birthday' | 'adoption' | 'other';
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
  notes?: string;
  completed?: boolean;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed?: string;
  birthdate?: Date;
  adoptionDate?: Date;
  color?: string;
  weight?: number;
  profileImage?: string;
  notes?: string;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export type ActivityRecord = {
  id: string;
  petId: string;
  title: string;
  date: Date;
  type: 'walk' | 'run' | 'hike' | 'play' | 'other';
  duration: number; // in seconds
  distance: number; // in meters
  route: Coordinate[];
  avgPace?: number; // in minutes per kilometer
  notes?: string;
  photos?: string[];
  weather?: WeatherType;
};