#!/bin/bash

# Adjusted base path to point @/ to ./app
# This will fix all imports like "@/components/Icon" etc.

FILES=$(grep -rl "@/.*" ./app)

for file in $FILES; do
  echo "🔧 Patching $file"

  sed -i '' -E 's|@/|../|g' "$file"
done

echo "✅ All @/ aliases patched to relative ../ paths"

