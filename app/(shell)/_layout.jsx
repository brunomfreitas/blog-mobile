import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AppFooter from "../../components/AppFooter";
import AppHeader from "../../components/AppHeader";

export default function ShellLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      <View style={styles.content}>
        <Slot />
      </View>

      <AppFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1 },
});

