#!/usr/bin/env bash

echo "🧼 Deep cleaning all broken import statements..."

grep -rlE 'from @/' ./app | while read -r file; do
  echo "🔍 Fixing $file"
  sed -i '' -E '
    s/from @\/([^\";\s]+)'\''/from "@\/\1"/g;
    s/from @\/([^\";\s]+)/from "@\/\1"/g;
    s/;import/;\nimport/g;
    s/import (.*) from @\/([^\";\s]+);/import \1 from "@\/\2";/g;
    s/import (.*) from @\/([^\";\s]+)'\''/import \1 from "@\/\2"/g;
  ' "$file"
  echo "✅ Cleaned: $file"
done

echo "🎉 All broken import lines cleaned and separated."

