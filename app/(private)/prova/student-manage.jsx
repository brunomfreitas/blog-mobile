import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../../../auth/AuthContext";
import { getAllProva } from "../../../services/provaService";

function normalizeProva(p) {
  const provaAluno = p?.provaAluno ?? null;

  return {
    id: String(p?.id ?? ""),
    descricao: p?.descricao ?? "Sem descrição",
    createdAt: p?.createdAt ?? null,
    createdBy: p?.createdBy ?? null,
    tempoProva: Number(p?.tempoProva ?? 0),
    totalQuestoes: Array.isArray(p?.questoes) ? p.questoes.length : 0,
    provaAlunoId: provaAluno?.id ?? null,
    status: provaAluno?.status ?? "PENDENTE",
    nota: provaAluno?.nota ?? null,
    tempoGasto: provaAluno?.tempoGasto ?? null,
  };
}

function formatTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;

  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

const FILTERS = ["TODAS", "PENDENTE", "EM_ANDAMENTO", "FINALIZADA", "EXPIRADA"];

export default function StudentManageProva() {
  const { user } = useAuth();

  const alunoId =
    user?.personId ??
    user?.person?.id ??
    user?.id ??
    null;

  const [provas, setProvas] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODAS");

  async function fetchProvas({ reset = false, nextPage = 1 } = {}) {
    try {
      if (reset) {
        setLoading(true);
        setError("");
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }

      const params = { alunoId };

      if (statusFilter !== "TODAS") {
        params.status = statusFilter;
      }

      const resp = await getAllProva(nextPage, 10, params);
      const data = resp?.data ?? [];
      const list = Array.isArray(data) ? data : data?.items ?? data?.data ?? [];

      const newItems = list.map(normalizeProva);

      if (reset) {
        setProvas(newItems);
        setPage(nextPage);
      } else {
        setProvas((prev) => [...prev, ...newItems]);
        setPage(nextPage);
      }

      setHasMore(newItems.length >= 10);
    } catch (e) {
      console.log("❌ Erro ao carregar provas do aluno:", e);
      setError("Não foi possível carregar as provas.");
      if (reset) setProvas([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    if (!alunoId) return;
    fetchProvas({ reset: true, nextPage: 1 });
  }, [alunoId, statusFilter]);

  function handleOpenProva(item) {
    router.push(`/(private)/prova/do/${item.id}`);
  }

  function renderItem({ item }) {
    const locked = item.status === "FINALIZADA" || item.status === "EXPIRADA";

    return (
      <View style={styles.card}>
        <View style={{ gap: 6 }}>
          <Text style={styles.badge}>Prova</Text>
          <Text style={styles.title}>{item.descricao}</Text>

          <Text style={styles.meta}>
            Tempo: {item.tempoProva > 0 ? `${item.tempoProva} min` : "Não informado"}
          </Text>

          <Text style={styles.meta}>Questões: {item.totalQuestoes}</Text>
          <Text style={styles.meta}>Status: {item.status}</Text>

          {item.nota != null && (
            <Text style={styles.meta}>Nota: {Number(item.nota).toFixed(1)}</Text>
          )}

          {item.tempoGasto != null && (
            <Text style={styles.meta}>Tempo gasto: {formatTime(item.tempoGasto)}</Text>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, locked ? styles.btnGhost : styles.btnPrimary]}
            onPress={() => handleOpenProva(item)}
          >
            <Text
              style={[
                styles.btnText,
                locked ? styles.btnGhostText : styles.btnPrimaryText,
              ]}
            >
              {locked ? "Ver resultado" : "Responder"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const empty = !loading && provas.length === 0;

  const filteredProvas = useMemo(() => {
    if (statusFilter === "TODAS") return provas;
    return provas.filter((item) => item.status === statusFilter);
  }, [provas, statusFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.pageTitle}>Minhas Provas</Text>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => {
          const active = statusFilter === filter;

          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setStatusFilter(filter)}
            >
              <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, { marginTop: 12 }]}
            onPress={() => fetchProvas({ reset: true, nextPage: 1 })}
          >
            <Text style={[styles.btnText, styles.btnPrimaryText]}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : empty ? (
        <View style={styles.center}>
          <Text style={styles.centerText}>Nenhuma prova disponível.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProvas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onEndReached={() => {
            if (!hasMore || loadingMore) return;
            fetchProvas({ reset: false, nextPage: page + 1 });
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 16 }}>
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
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  filterChip: {
    backgroundColor: "#f1f1f1",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  filterChipActive: {
    backgroundColor: "#111",
  },

  filterChipText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "700",
  },

  filterChipTextActive: {
    color: "#fff",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  centerText: {
    marginTop: 10,
    color: "#666",
    textAlign: "center",
  },

  errorText: {
    color: "crimson",
    fontWeight: "700",
    textAlign: "center",
  },

  listContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 12,
  },

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

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  meta: {
    fontSize: 13,
    color: "#666",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },

  btn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    fontWeight: "800",
  },

  btnPrimary: {
    backgroundColor: "#000",
  },

  btnPrimaryText: {
    color: "#fff",
  },

  btnGhost: {
    backgroundColor: "#f1f1f1",
  },

  btnGhostText: {
    color: "#111",
  },
});