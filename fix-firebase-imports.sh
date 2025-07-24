#!/bin/bash

echo "🔧 Starting Firebase import fixes..."

files=(
  "app/activity/new.tsx"
  "app/activity/[id].tsx"
  "app/(tabs)/journal.tsx"
  "app/(tabs)/medical.tsx"
  "app/(tabs)/activities.tsx"
  "app/(tabs)/reminders.tsx"
  "app/(tabs)/settings.tsx"
  "app/pet/[id].tsx"
  "app/lib/firebaseUtils.js"
)

for file in "${files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "🔁 Fixing $file"

    # Remove any old firebaseConfig import
    sed -i '' '/firebaseConfig/d' "$file"

    # Determine correct import path
    if [[ "$file" == app/lib/* ]]; then
      path="./firebaseConfig"
    elif [[ "$file" == app/\(tabs\)* ]]; then
      path="../../lib/firebaseConfig"
    elif [[ "$file" == app/activity/* || "$file" == app/pet/* ]]; then
      path="../lib/firebaseConfig"
    else
      path="@/lib/firebaseConfig"
    fi

    # Use printf to safely escape slashes
    importLine=$(printf "import { app } from '%s';\n" "$path")

    # Insert at top of file
    sed -i '' "1s~^~$importLine~" "$file"
  else
    echo "❌ Skipped missing file: $file"
  fi
done

echo "✅ Firebase imports updated in all existing files."

