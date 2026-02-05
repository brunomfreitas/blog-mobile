// import { router } from "expo-router";
// import { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { useAuth } from "./AuthContext";

// export function RequireAuth({ children }) {
//   const { user, booting } = useAuth();

//   useEffect(() => {
//     if (!booting && !user) {
//       router.replace("/login");
//     }
//   }, [booting, user]);

//   if (booting) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!user) return null;

//   return <>{children}</>;
// }


// src/components/RequireAuth.jsx (ou onde você mantém)
import { Redirect, usePathname } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // ✅ Espera hidratar token/user do AsyncStorage
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  // ✅ Se não estiver logado, redireciona (melhor que só mostrar texto)
  if (!isAuthenticated) {
    return <Redirect href={`/login?next=${encodeURIComponent(pathname)}`} />;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
