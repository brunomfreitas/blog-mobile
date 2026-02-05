import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function AppHeader() {
  const { isAuthenticated, signOut } = useAuth();

  function handleLogin() {
    router.push("/login");
  }

  async function handleLogout() {
    await signOut();
    router.replace("/(shell)");
  }

  return (
    <View style={styles.header}>
      {/* Título central */}
      <Text style={styles.title}>Blog</Text>

      {/* Ações no canto direito */}
      <View style={styles.actions}>
        {!isAuthenticated ? (
          <TouchableOpacity onPress={handleLogin}>
            <Ionicons name="log-in-outline" size={24} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#060606",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  actions: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
});
