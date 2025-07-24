import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.whiteFur,
          },
          headerShadowVisible: false,
          headerTintColor: colors.baileyBlack,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: colors.lightGray,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="journal/[id]" 
          options={{ 
            title: "Journal Entry",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="journal/new" 
          options={{ 
            title: "New Journal Entry",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="medical/[id]" 
          options={{ 
            title: "Medical Record",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="medical/new" 
          options={{ 
            title: "New Medical Record",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="reminder/[id]" 
          options={{ 
            title: "Reminder",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="reminder/new" 
          options={{ 
            title: "New Reminder",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="pet/new" 
          options={{ 
            title: "Add Pet",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="pet/[id]" 
          options={{ 
            title: "Pet Profile",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="activity/[id]" 
          options={{ 
            title: "Activity Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="activity/new" 
          options={{ 
            title: "Track Activity",
            presentation: "modal",
          }} 
        />
      </Stack>
    </>
  );
}