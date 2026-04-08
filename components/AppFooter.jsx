import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../auth/AuthContext"; // ajuste o path se necessário

export default function AppFooter() {
	const pathname = usePathname();
	const { user, isAuthenticated } = useAuth();

	console.log('user', user);

    const personType =
		user?.typePerson ??
		user?.type_person ??
		user?.person?.typePerson ??
		user?.person?.type_person ??
		null;

		console.log('personType', personType);

	const isProfessor = personType === "P";
	const isAluno = personType === "A";

  	if (!isAuthenticated) return null;

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
					{isProfessor && (
						<>
						<Item label="Postagens" href="/(private)/post/manage" />
						<Item label="Banco de Questões" href="/(private)/questao/manage" />
						<Item label="Provas" href="/(private)/prova/manage" />
						<Item label="Professor" href="/(private)/teacher/manage" />
						<Item label="Aluno" href="/(private)/student/manage" />
						</>
					)}

					{isAluno && (
						<>
						<Item label="Provas" href="/(private)/prova/student-manage" />
						</>
					)}
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
