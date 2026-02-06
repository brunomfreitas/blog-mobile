import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../auth/AuthContext"; // ajuste o path se necessário

export default function AppFooter() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const Item = ({ label, href }) => {
    const active = pathname === href;
    return (
      <Pressable style={styles.item} onPress={() => router.push(href)}>
        <Text style={[styles.text, active && styles.active]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.footer}>
      <Item label="Início" href="/(shell)" />
       {/* Só aparece se estiver logado */}
      {isAuthenticated && (
		<>
        	<Item label="Admin" href="/(private)/post/manage" />
			<Item label="Professor" href="/(private)/teacher/manage" />
			<Item label="Aluno" href="/(private)/student/manage" />
		</>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 56,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#060606",
  },
  item: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 14 },
  active: { fontWeight: "700" },
});
