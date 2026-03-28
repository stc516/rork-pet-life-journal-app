#!/bin/bash

echo "🔧 Starting global Firebase import fix..."

# Find all .tsx and .js files in the app directory
find ./app \( -name "*.tsx" -o -name "*.js" \) | while read -r file; do
  echo "🔁 Fixing: $file"

  # Remove old firebaseConfig import line(s)
  sed -i '' '/firebaseConfig/d' "$file"

  # Figure out relative path to firebaseConfig
  depth=$(echo "$file" | grep -o "/" | wc -l | tr -d ' ')
  if (( depth == 2 )); then
    path="@/lib/firebaseConfig"
  elif (( depth == 3 )); then
    path="../lib/firebaseConfig"
  elif (( depth == 4 )); then
    path="../../lib/firebaseConfig"
  else
    path="@/lib/firebaseConfig"
  fi

  # Construct import line
  importLine="import { app } from '$path';"

  # Insert it as the very first line
  sed -i '' "1s~^~$importLine\n~" "$file"
done

echo "✅ All Firebase imports updated."

