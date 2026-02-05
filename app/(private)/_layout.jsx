import { Stack } from "expo-router";
import RequireAuth from "../../auth/RequireAuth";
import AppFooter from "../../components/AppFooter";
import AppHeader from "../../components/AppHeader";

export default function PrivateLayout() {
  return (
	<>
	    <AppHeader />
			<RequireAuth>
      			<Stack screenOptions={{ headerShown: false }} />
    		</RequireAuth>
		<AppFooter />	
	</>
  );
}
