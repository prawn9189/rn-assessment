import { NAV_THEME } from "@/constants/colors";
import { useColorScheme } from "@/scripts/useColorScheme";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

import "@/global.css";

// Prevent splash screen auto hiding
SplashScreen.preventAutoHideAsync();

const font = {
  regular: { fontFamily: "SpaceMono", fontWeight: "400" },
  medium: { fontFamily: "SpaceMono", fontWeight: "500" },
  bold: { fontFamily: "SpaceMono", fontWeight: "700" },
  heavy: { fontFamily: "SpaceMono", fontWeight: "900" },
} as const;

const LIGHT_THEME: Theme = {
  dark: false,
  fonts: font,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  fonts: font,
  colors: NAV_THEME.dark,
};

function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SystemUI.setBackgroundColorAsync("#000000");
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Appointments",
          }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "Login" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default RootLayout;
