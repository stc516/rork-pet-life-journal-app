#!/usr/bin/env bash

echo "🛠 Fixing missing quotes around alias imports..."

# Fix broken alias imports with single or double quotes
grep -rl 'from @/' ./app | while read -r file; do
  sed -i '' -E "s/from @\/([^']+)'/from '@\/\1'/g" "$file"
  sed -i '' -E 's/from @\/([^"]+)"/from "@\/\1"/g' "$file"
  echo "✅ Fixed: $file"
done

echo "🎉 All broken import quotes fixed."

