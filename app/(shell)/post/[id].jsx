import { format } from "date-fns";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getPostById } from "../../../services/postsService";

// ✅ seu placeholder local (troque pelo caminho real do seu asset)
const FALLBACK_IMAGE = require("../../../assets/imgs/sem_imagem.png");

export default function PostDetails() {
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===== 1) Carrega post =====
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const resp = await getPostById(String(id));

        // dependendo do seu service, pode ser resp.data ou resp direto
        const data = resp?.data ?? resp;
        setPost(data ?? null);
      } catch (e) {
        console.error("❌ Erro ao carregar post:", e);
        setError("Não foi possível carregar o post.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ===== 2) Normaliza campos (parecido com o web) =====
  const normalized = useMemo(() => {
    if (!post) return null;

    const title = post?.title ?? "Sem título";
    const subtitle = post?.subtitle ?? "";
    const message = post?.message ?? post?.content ?? "";
    const category = post?.postCategory?.name ?? "Geral";
    const author = post?.postedByPerson?.name ?? "Autor desconhecido";
    const date = post?.postedAt ?? null;

    // imagem pode vir como URL string
    const imageSrc = post?.image ? { uri: post.image } : FALLBACK_IMAGE;

    return { title, subtitle, message, category, author, date, imageSrc };
  }, [post]);

  // ===== UI states =====
  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Post" }} />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={{ title: "Post" }} />
        <View style={styles.center}>
          <Text style={[styles.centerText, { color: "red" }]}>{error}</Text>

          <TouchableOpacity
            style={[styles.btn, { marginTop: 12 }]}
            onPress={() => router.back()}
          >
            <Text style={styles.btnText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  if (!normalized) {
    return (
      <>
        <Stack.Screen options={{ title: "Post" }} />
        <View style={styles.center}>
          <Text style={styles.centerText}>Post não encontrado.</Text>
          <TouchableOpacity style={[styles.btn, { marginTop: 12 }]} onPress={() => router.back()}>
            <Text style={styles.btnText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const dateLabel = normalized.date
    ? format(new Date(normalized.date), "dd/MM/yyyy HH:mm")
    : "";

  return (
    <>
      <Stack.Screen options={{ title: "Post" }} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Mensagem de boas-vindas (igual o web) */}
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>
            Boa leitura! Este conteúdo foi preparado por professores para apoiar seus estudos.
          </Text>
          <Text style={styles.headerSubtitle}>
            Para voltar ao início, clique em “Início” no menu inferior.
          </Text>
        </View>

        {/* Imagem */}
        <Image source={normalized.imageSrc} style={styles.image} contentFit="cover" />

        {/* Conteúdo */}
        <View style={styles.card}>
          {/* Categoria */}
          <Text style={styles.category}>{normalized.category}</Text>

          {/* Título */}
          <Text style={styles.title}>{normalized.title}</Text>

          {/* Subtítulo */}
          {!!normalized.subtitle && <Text style={styles.subtitle}>{normalized.subtitle}</Text>}

          {/* Mensagem */}
          <Text style={styles.message}>{normalized.message}</Text>

          {/* Autor + Data */}
          <View style={styles.authorRow}>
            <Text style={styles.author}>{normalized.author}</Text>
            {!!dateLabel && <Text style={styles.date}>{dateLabel}</Text>}
          </View>

          {/* Botões */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btn} onPress={() => router.push(`/(shell)`)}>
              <Text style={styles.btnText}>Voltar</Text>
            </TouchableOpacity>            
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16, gap: 10 },
  centerText: { color: "#333" },
  container: { padding: 16, gap: 12 },
  headerBox: { gap: 6, marginBottom: 4 },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#111" },
  headerSubtitle: { fontSize: 14, color: "#555" },
  image: { width: "100%", height: 220, borderRadius: 14, backgroundColor: "#eee" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  category: { fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#666" },
  title: { fontSize: 22, fontWeight: "800", color: "#111", lineHeight: 28 },
  subtitle: { fontSize: 15, color: "#555", lineHeight: 22 },
  message: { fontSize: 15, color: "#222", lineHeight: 24, marginTop: 6 },
  authorRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  author: { fontSize: 13, color: "#444", fontWeight: "600", flex: 1 },
  date: { fontSize: 12, color: "#777" },
  actionsRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  btn: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#111", fontWeight: "700" },
  btnPrimary: { backgroundColor: "#000" },
  btnPrimaryText: { color: "#fff" },
});
