import React from "react";
import { Tabs } from "expo-router";
import { colors } from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

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
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: "Activities",
          tabBarIcon: ({ color }) => <FontAwesome name="map" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="medical"
        options={{
          title: "Medical",
          tabBarIcon: ({ color }) => <FontAwesome name="heartbeat" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color }) => <FontAwesome name="calendar" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
