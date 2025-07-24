#!/bin/bash

echo "🔧 Fixing all firebaseConfig import paths..."

# Fix firebaseConfig imports
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '../lib/firebaseConfig'|from '@/lib/firebaseConfig'|g" {} +
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '../../lib/firebaseConfig'|from '@/lib/firebaseConfig'|g" {} +
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '../app/app/firebaseConfig'|from '@/lib/firebaseConfig'|g" {} +

# Fix firebaseUtils if needed
find app -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i '' "s|from '../lib/firebaseUtils'|from '@/lib/firebaseUtils'|g" {} +
find app -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i '' "s|from '../../lib/firebaseUtils'|from '@/lib/firebaseUtils'|g" {} +
find app -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i '' "s|from './lib/firebaseUtils'|from '@/lib/firebaseUtils'|g" {} +

echo "✅ Done fixing all import paths."

