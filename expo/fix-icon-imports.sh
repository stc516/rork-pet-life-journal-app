#!/bin/bash

declare -A importMap=(
  ["app/(tabs)/activities.tsx"]='../../components/Icon'
  ["app/(tabs)/journal.tsx"]='../../components/Icon'
  ["app/(tabs)/medical.tsx"]='../../components/Icon'
  ["app/(tabs)/reminders.tsx"]='../../components/Icon'
  ["app/(tabs)/settings.tsx"]='../../components/Icon'
  ["app/(tabs)/index.tsx"]='../../components/Icon'
  ["app/activity/new.tsx"]='../components/Icon'
  ["app/activity/[id].tsx"]='../components/Icon'
  ["app/pet/[id].tsx"]='../components/Icon'
  ["components/FloatingActionButton.tsx"]='./Icon'
  ["components/ReminderCard.tsx"]='./Icon'
  ["components/MedicalRecordCard.tsx"]='./Icon'
  ["components/JournalEntryCard.tsx"]='./Icon'
  ["components/ActivityCard.tsx"]='./Icon'
)

for file in "${!importMap[@]}"; do
  if [[ -f "$file" ]]; then
    echo "🔁 Fixing $file"

    # Remove all Lucide imports
    sed -i '' '/lucide-react-native/d' "$file"

    # Replace incorrect @/components/Icon imports if present
    sed -i '' "s|@/components/Icon|${importMap[$file]}|g" "$file"

    # Only add Icon import if not already in the file
    if ! grep -q "import Icon from '${importMap[$file]}'" "$file"; then
      sed -i '' "1s;^;import Icon from '${importMap[$file]}';\n;" "$file"
    fi
  else
    echo "❌ Skipped missing file: $file"
  fi
done

echo "✅ All Icon imports patched and Lucide nuked."

