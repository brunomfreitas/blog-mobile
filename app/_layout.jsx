// app/_layout.jsx
import { Stack } from "expo-router";
import { AuthProvider } from "../auth/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="(shell)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(shell)" />
        <Stack.Screen name="(private)" />
        <Stack.Screen name="login" />
      </Stack>
    </AuthProvider>
  );
}
