import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import RequireAuth from "../../auth/RequireAuth";
import AppFooter from "../../components/AppFooter";
import AppHeader from "../../components/AppHeader";


export default function PrivateLayout() {
  	return (
		<SafeAreaView style={styles.safe}>
			<AppHeader />
				<RequireAuth>
					<Stack screenOptions={{ headerShown: false }} />
				</RequireAuth>
			<AppFooter />	
		</SafeAreaView>
  	);
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1 },
});
