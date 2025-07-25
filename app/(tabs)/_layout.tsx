import React from "react";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";

const tabConfig = [
  { name: "index", title: "Home", icon: "home" },
  { name: "journal", title: "PetJournal", icon: "book" },
  { name: "activities", title: "Activities", icon: "map" },
  { name: "medical", title: "Medical", icon: "heartbeat" },
  { name: "reminders", title: "Reminders", icon: "calendar" },
  { name: "settings", title: "Settings", icon: "cog" },
  { name: "pets", title: "Pets", icon: "paw" },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.skyEyeBlue,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: {
          backgroundColor: colors.whiteFur,
          borderTopColor: colors.mediumGray,
        },
        headerStyle: {
          backgroundColor: colors.whiteFur,
        },
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      {tabConfig.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <FontAwesome name={icon} size={22} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

