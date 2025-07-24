#!/bin/bash

declare -A file_prompts

file_prompts["app/activity/new.tsx"]="Replace lucide-react-native import with: import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; Replace <Calendar />, <Camera />, <Clock />, <MapPin />, <Play />, <Stop /> with <Icon name='...' size={24} color='black' />."
file_prompts["app/activity/[id].tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Clock -> clock, Edit -> pencil, MapPin -> map-marker, Ruler -> ruler, Trash2 -> trash-can."
file_prompts["app/(tabs)/settings.tsx"]="Replace lucide-react-native import with Icon. Replace all icon components used with corresponding Icon component from MaterialCommunityIcons."
file_prompts["app/(tabs)/index.tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Clock -> clock, Edit -> pencil, Map -> map, Plus -> plus, PawPrint -> paw."
file_prompts["app/(tabs)/medical.tsx"]="Replace lucide-react-native import with Icon. Replace PawPrint -> paw."
file_prompts["app/(tabs)/activities.tsx"]="Replace lucide-react-native import with Icon. Replace Map -> map."
file_prompts["app/(tabs)/reminders.tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar."
file_prompts["app/(tabs)/journal.tsx"]="Replace lucide-react-native import with Icon. Replace Book -> book, Filter -> filter."
file_prompts["app/pet/[id].tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Edit -> pencil, Trash2 -> trash-can."
file_prompts["components/FloatingActionButton.tsx"]="Replace lucide-react-native import with Icon. Replace Plus -> plus."
file_prompts["components/ReminderCard.tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Check -> check, Clock -> clock, RotateCcw -> history."
file_prompts["components/MedicalRecordCard.tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Clock -> clock."
file_prompts["components/JournalEntryCard.tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Cloud -> cloud, MapPin -> map-marker."
file_prompts["components/ActivityCard.tsx"]="Replace lucide-react-native import with Icon. Replace Calendar -> calendar, Clock -> clock, MapPin -> map-marker, Ruler -> ruler."

for FILE in "${!file_prompts[@]}"; do
  echo "🔧 Fixing $FILE"
  gh copilot suggest -f "$FILE" -p "${file_prompts[$FILE]}"
done

