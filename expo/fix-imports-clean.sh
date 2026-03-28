#!/usr/bin/env bash

echo "🔧 Running full alias + asset path fixer..."

# Map of broken → fixed import paths
declare -a patterns=(
  's|from @/|from "@/|g'
  's|import @/|import "@/|g'
  's|from @/|from "@/|g'
  's|../constants/colors|@/constants/colors|g'
  's|../constants/fonts|@/constants/fonts|g'
  's|../../constants/colors|@/constants/colors|g'
  's|../../constants/fonts|@/constants/fonts|g'
  's|../../lib/firebaseConfig|@/lib/firebaseConfig|g'
  's|../lib/firebaseConfig|@/lib/firebaseConfig|g'
  's|../../firebaseConfig|@/lib/firebaseConfig|g'
  's|../assets/pets/bailey.png|@/assets/images/pet-placeholder.png|g'
)

# Target only .ts and .tsx files in app/
find ./app -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
  for pattern in "${patterns[@]}"; do
    sed -i '' -E "$pattern" "$file"
  done
  echo "✅ Cleaned: $file"
done

echo "🎉 All import paths and asset paths have been cleaned up."

