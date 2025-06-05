import { Pet } from '@/types/pet';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Bailey',
    species: 'Dog',
    breed: 'Husky',
    birthdate: new Date('2020-05-15'),
    adoptionDate: new Date('2020-07-10'),
    color: 'Black and White',
    weight: 45,
    profileImage: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=1287&auto=format&fit=crop',
    notes: "Bailey loves playing in the snow and chasing squirrels. He's very vocal and has the most beautiful blue eyes."
  },
  {
    id: '2',
    name: 'Maggie',
    species: 'Dog',
    breed: 'Golden Retriever',
    birthdate: new Date('2019-03-22'),
    adoptionDate: new Date('2019-05-30'),
    color: 'Golden',
    weight: 65,
    profileImage: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=1160&auto=format&fit=crop',
    notes: "Maggie is the sweetest girl who loves belly rubs and swimming. She's great with kids and other dogs."
  }
];