#!/bin/bash

echo "🔧 Running alias import fixer..."

# Each line: old_path|new_path
fixes=$(cat <<EOF
../constants/colors|@/constants/colors
../constants/fonts|@/constants/fonts
../../lib/firebaseConfig|@/lib/firebaseConfig
../lib/firebaseConfig|@/lib/firebaseConfig
../../constants/colors|@/constants/colors
../../constants/fonts|@/constants/fonts
../../firebaseConfig|@/lib/firebaseConfig
EOF
)

# Loop through each line of the fixes
while IFS="|" read -r old new; do
  echo "📁 Replacing $old → $new"
  grep -rl "$old" ./app | while read -r file; do
    sed -i '' "s|$old|$new|g" "$file"
    echo "✅ Updated: $file"
  done
done <<< "$fixes"

echo "🎉 All import paths have been updated."


