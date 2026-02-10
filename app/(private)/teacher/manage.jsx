import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../../../auth/AuthContext";
import { deletePerson, getTeachers, searchTeachers } from "../../../services/personService";
import { brToIso, isoToBr } from "../../../utils/date";

function normalizeTeacher(t) {
  return {
    id: String(t?.id ?? ""),
    name: t?.name ?? "Sem nome",
    cpf: t?.cpf ?? "",
    birth: t?.birth ? isoToBr(t?.birth) : "",
    email: t?.email ?? "",
	type_person: t?.type_person ?? "P",
    status: Boolean(t?.status),
  };
}

export default function TeachersManage() {
  
	const { token } = useAuth();
	const [query, setQuery] = useState("");
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

  async function fetchTeachers() {
    try {
      setLoading(true);

      const q = query.trim();
      const resp = q
        ? await searchTeachers(token, q, "P")
        : await getTeachers(token);

      // seu backend pode responder como array direto ou { data: [...] }
      const data = resp?.data ?? [];
      const list = Array.isArray(data) ? data : (data?.items ?? []);
      setItems(list.map(normalizeTeacher));
    } catch (e) {
      console.log("❌ Erro ao carregar professores:", e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
	// primeira carga: chama uma vez sem debounce
	if (query === null || query === '') {    
		fetchTeachers();    
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [query]);

  function confirmDelete(item) {
    if (Platform.OS === "web") {
      const ok = window.confirm(`Excluir professor:\n\n"${item.name}"?`);
      if (!ok) return;
      return handleDelete(item);
    }

    Alert.alert("Excluir professor", `Tem certeza que deseja excluir:\n\n"${item.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => handleDelete(item) },
    ]);
  }

  async function handleDelete(item) {
    try {
		item.birth = brToIso(item.birth);
      	await deletePerson(item.id, item, token);
      	setItems((prev) => prev.filter((t) => t.id !== item.id));
      	Alert.alert("Sucesso", "Professor excluído!");
    } catch (e) {
      	console.log("❌ Erro ao excluir professor:", e);
      	Alert.alert("Erro", "Não foi possível excluir.");
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {item.cpf ? `CPF: ${item.cpf} • ` : ""}
          {item.email || "—"}
        </Text>
        {!!item.birth && <Text style={styles.meta}>Nasc.: {item.birth}</Text>}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnGhost]}
          onPress={() => router.push(`/(private)/teacher/edit/${item.id}`)}
        >
          <Text style={styles.btnGhostText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => confirmDelete(item)}>
          <Text style={styles.btnDangerText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.pageTitle}>Gerenciar Professores</Text>
        <TouchableOpacity style={styles.newBtn} onPress={() => router.push("/(private)/teacher/new")}>
          <Text style={styles.newBtnText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

	<View style={styles.searchWrapper}>
	<TextInput
		placeholder="Buscar por nome, CPF ou email..."
		value={query}
		onChangeText={setQuery}
		style={styles.searchInput}
		returnKeyType="search"
		onSubmitEditing={fetchTeachers} // opcional (enter)
	/>

	<TouchableOpacity style={styles.searchBtn} onPress={fetchTeachers}>
		<Text style={styles.searchIcon}>🔍</Text>
	</TouchableOpacity>
	</View>


      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={loading}
          onRefresh={fetchTeachers}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  newBtn: { backgroundColor: "#000", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  newBtnText: { color: "#fff", fontWeight: "900" },

  search: { backgroundColor: "#f1f1f1", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },

  card: { flexDirection: "row", gap: 12, padding: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", marginBottom: 10 },
  title: { fontSize: 15, fontWeight: "900" },
  meta: { fontSize: 12, color: "#666" },

  actions: { gap: 8, justifyContent: "center" },
  btn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, alignItems: "center" },
  btnGhost: { borderWidth: 1, borderColor: "#ddd" },
  btnGhostText: { fontWeight: "800" },
  btnDanger: { backgroundColor: "#000" },
  btnDangerText: { color: "#fff", fontWeight: "900" },

  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  centerText: { color: "#666" },
  searchWrapper: {
    flexDirection: "row",
	alignItems: "center",
	backgroundColor: "#f1f1f1",
	borderRadius: 10,
	paddingHorizontal: 8,
	marginBottom: 10,
  },

  searchInput: {
	flex: 1,
	paddingVertical: 10,
	paddingHorizontal: 8,
  },

  searchBtn: {
	padding: 8,
  },

  searchIcon: {
	fontSize: 18,
  },

});
