#!/bin/bash

echo "🔧 Overwriting icon files..."

cat > app/\(tabs\)/medical.tsx << 'EOF'
import React from 'react';
import { View, Text } from 'react-native';
import Icon from '@/components/Icon';

export default function MedicalScreen() {
  return (
    <View>
      <Text>Medical</Text>
      <Icon name="paw" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/activity/new.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function NewActivity() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="camera" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="map-marker" size={24} color="black" />
      <Icon name="play" size={24} color="black" />
      <Icon name="stop" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/activity/\[id\].tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function ActivityDetail() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="pencil" size={24} color="black" />
      <Icon name="map-marker" size={24} color="black" />
      <Icon name="ruler" size={24} color="black" />
      <Icon name="trash-can" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/\(tabs\)/settings.tsx << 'EOF'
import React from 'react';
import { View, Text } from 'react-native';
import Icon from '@/components/Icon';

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
      <Icon name="gear" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/\(tabs\)/index.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function HomeScreen() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="pencil" size={24} color="black" />
      <Icon name="map" size={24} color="black" />
      <Icon name="plus" size={24} color="black" />
      <Icon name="paw" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/\(tabs\)/activities.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function ActivitiesScreen() {
  return (
    <View>
      <Icon name="map" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/\(tabs\)/reminders.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function RemindersScreen() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/\(tabs\)/journal.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function JournalScreen() {
  return (
    <View>
      <Icon name="book" size={24} color="black" />
      <Icon name="filter" size={24} color="black" />
    </View>
  );
}
EOF

cat > app/pet/\[id\].tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function PetDetailsScreen() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="pencil" size={24} color="black" />
      <Icon name="trash-can" size={24} color="black" />
    </View>
  );
}
EOF

cat > components/FloatingActionButton.tsx << 'EOF'
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';

export default function FloatingActionButton() {
  return (
    <TouchableOpacity>
      <Icon name="plus" size={24} color="black" />
    </TouchableOpacity>
  );
}
EOF

cat > components/ReminderCard.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function ReminderCard() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="check" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="history" size={24} color="black" />
    </View>
  );
}
EOF

cat > components/MedicalRecordCard.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function MedicalRecordCard() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
    </View>
  );
}
EOF

cat > components/JournalEntryCard.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function JournalEntryCard() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="cloud" size={24} color="black" />
      <Icon name="map-marker" size={24} color="black" />
    </View>
  );
}
EOF

cat > components/ActivityCard.tsx << 'EOF'
import React from 'react';
import { View } from 'react-native';
import Icon from '@/components/Icon';

export default function ActivityCard() {
  return (
    <View>
      <Icon name="calendar" size={24} color="black" />
      <Icon name="clock" size={24} color="black" />
      <Icon name="map-marker" size={24} color="black" />
      <Icon name="ruler" size={24} color="black" />
    </View>
  );
}
EOF

echo "✅ All icon files overwritten successfully."

