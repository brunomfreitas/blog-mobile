import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { deleteProva, getAllProva } from "../../../services/provaService";

function normalizeProva(p) {
  return {
    id: String(p?.id ?? ""),
    descricao: p?.descricao ?? "Sem descrição",
    createdAt: p?.createdAt ?? null,
    createdBy: p?.createdBy ?? null,
    totalQuestoes: Array.isArray(p?.questoes) ? p.questoes.length : (p?.totalQuestoes ?? 0)
  };
}

export default function ProvaManage() {
  const [provas, setProvas] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  async function fetchProvas({ reset = false, nextPage = 1 } = {}) {
    try {
      if (reset) {
        setLoading(true);
        setError("");
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }

      const resp = await getAllProva(nextPage, 12);
      const data = resp?.data ?? [];
      const list = Array.isArray(data) ? data : (data?.items ?? []);

      const newItems = list.map(normalizeProva);

      if (reset) {
        setProvas(newItems);
        setPage(nextPage);
      } else {
        setProvas((prev) => prev.concat(newItems));
        setPage(nextPage);
      }

      setHasMore(newItems.length >= 12);
    } catch (e) {
      console.log("❌ Erro ao carregar provas:", e);
      setError("Não foi possível carregar as provas.");
      if (reset) setProvas([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    fetchProvas({ reset: true, nextPage: 1 });
  }, []);

  function confirmDelete(item) {
    if (Platform.OS === "web") {
      const ok = window.confirm(
        `Tem certeza que deseja excluir:\n\n"${item.descricao}"?`
      );

      if (!ok) return;
      handleDelete(item);
      return;
    }

    Alert.alert(
      "Excluir prova",
      `Tem certeza que deseja excluir:\n\n"${item.descricao}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => handleDelete(item),
        },
      ]
    );
  }

  async function handleDelete(item) {
    try {
      await deleteProva(item.id);
      setProvas((prev) => prev.filter((p) => p.id !== item.id));
      Alert.alert("Sucesso", "Prova excluída!");
    } catch (e) {
      console.log("❌ Erro ao excluir prova:", e);
      Alert.alert("Erro", "Não foi possível excluir a prova.");
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.badge}>Prova</Text>
          <Text style={styles.title} numberOfLines={3}>{item.descricao}</Text>
          <Text style={styles.meta}>Questões: {item.totalQuestoes}</Text>
          <Text style={styles.meta}>ID: {item.id}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, styles.btnGhost]}
            onPress={() => router.push(`/(private)/prova/view/${item.id}`)}
          >
            <Text style={styles.btnGhostText}>Ver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnGhost]}
            onPress={() => router.push(`/(private)/prova/edit/${item.id}`)}
          >
            <Text style={styles.btnGhostText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnDanger]}
            onPress={() => confirmDelete(item)}
          >
            <Text style={styles.btnDangerText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const empty = !loading && provas.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.pageTitle}>Gerenciar Provas</Text>

        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => router.push("/(private)/prova/new")}
        >
          <Text style={styles.newBtnText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10, color: "#666" }}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={{ color: "crimson", fontWeight: "700" }}>{error}</Text>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, { marginTop: 12 }]}
            onPress={() => fetchProvas({ reset: true, nextPage: 1 })}
          >
            <Text style={styles.btnPrimaryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : empty ? (
        <View style={styles.center}>
          <Text style={{ color: "#666" }}>Nenhuma prova encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={provas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 12 }}
          onEndReached={() => {
            if (!hasMore || loadingMore) return;
            fetchProvas({ reset: false, nextPage: page + 1 });
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 14 }}>
                <ActivityIndicator />
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topRow: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: { fontSize: 20, fontWeight: "800", color: "#111" },
  newBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  newBtnText: { color: "#fff", fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontWeight: "700",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  title: { fontSize: 16, fontWeight: "800", color: "#111" },
  meta: { fontSize: 13, color: "#666" },
  actions: { flexDirection: "row", gap: 8, flexWrap: "wrap" },

  btn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGhost: { backgroundColor: "#f1f1f1" },
  btnGhostText: { color: "#111", fontWeight: "700" },
  btnDanger: { backgroundColor: "#ffe5e5" },
  btnDangerText: { color: "#c1121f", fontWeight: "700" },
  btnPrimary: { backgroundColor: "#000", paddingHorizontal: 16, paddingVertical: 10 },
  btnPrimaryText: { color: "#fff", fontWeight: "800" },
});