#!/bin/bash

# Comment lines using usePetStore
sed -i '' "s|^import { usePetStore.*|// &|" app/journal/new.tsx
sed -i '' "s|^  const { selectedPetId.*|// &|" app/journal/new.tsx
sed -i '' "s|petId: selectedPetId,|// petId: selectedPetId,|" app/journal/new.tsx

sed -i '' "s|^import { usePetStore.*|// &|" app/index.tsx
sed -i '' "s|  const { pets.*|// &|" app/index.tsx
sed -i '' "s|data={pets}|data={[]}|g" app/index.tsx

sed -i '' "s|^import { usePetStore.*|// &|" app/pet/new.tsx
sed -i '' "/addPet({/,/});/ s/^/\/\//" app/pet/new.tsx

sed -i '' "s|^import { usePetStore.*|// &|" app/\(tabs\)settings.tsx
sed -i '' "s|  const { pets.*|// &|" app/\(tabs\)settings.tsx
sed -i '' "s|  const { addPet.*|// &|" app/\(tabs\)settings.tsx

