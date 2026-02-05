import { format } from "date-fns";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { useAuth } from "../../../auth/AuthContext"; // ajuste o path
import { getCategories } from "../../../services/categoryService";
import { getPostStatus } from "../../../services/postStatusService";
import { createPost, getPostById, updatePost } from "../../../services/postsService";

const STATUS_PUBLICADO = 7;

// datetime-local não existe nativo.
// Aqui a gente usa um formato simples e manda ISO depois.
function formatDateBR(value) {
  if (!value) return "";
  try {
    return format(new Date(value), "dd/MM/yyyy HH:mm");
  } catch {
    return "";
  }
}

function toISOFromUserInput(text) {
  // Aceita "dd/MM/yyyy HH:mm" (ex: 29/01/2026 14:30)
  // Se preferir, depois trocamos por DateTimePicker.
  if (!text) return null;

  const m = text.match(/^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})$/);
  if (!m) return null;

  const [, dd, mm, yyyy, hh, min] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min), 0);

  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export default function PostForm() {
  const { id } = useLocalSearchParams();

  console.log('id', id);

  const isEdit = Boolean(id);

  const { user } = useAuth();

  console.log("user", user);

  // ✅ ajuste conforme seu backend /me
  const createdById = user?.personId ?? user?.person?.id ?? user?.id ?? null;
  const postedById = user?.personId ?? user?.person?.id ?? user?.id ?? null;

	useEffect(() => {
	if (user == null) return;
	// se está logado, ok
	}, [user]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Campos do form
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [statusId, setStatusId] = useState(null);

  // para publicado:
  const [postedAtText, setPostedAtText] = useState(""); // "dd/MM/yyyy HH:mm"

  // helper para labels
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === Number(categoryId)) ?? null,
    [categories, categoryId]
  );

  const selectedStatus = useMemo(
    () => statuses.find((s) => s.id === Number(statusId)) ?? null,
    [statuses, statusId]
  );

  // ===== Carregar combos + post (se edit) =====
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [catsResp, statusResp] = await Promise.all([getCategories(), getPostStatus()]);
        setCategories(catsResp?.data ?? []);
        setStatuses(statusResp?.data ?? []);

        if (isEdit) {
          const resp = await getPostById(String(id));
          const p = resp?.data ?? resp;

          setTitle(p?.title ?? "");
          setSubtitle(p?.subtitle ?? "");
          setMessage(p?.message ?? "");
          setImage(p?.image ?? "");

          setCategoryId(p?.category ?? p?.postCategory?.id ?? null);
          setStatusId(p?.status ?? null);

          // se já tiver postadoAt, preenche no formato BR
          if (p?.postedAt) setPostedAtText(formatDateBR(p.postedAt));
        } else {
          // default: rascunho? (se tiver)
          // se status 1 existir como "Rascunho", você pode setar aqui.
          // setStatusId(1);
        }
      } catch (e) {
        console.error("❌ Erro ao carregar form:", e);
        Alert.alert("Erro", "Não foi possível carregar os dados do formulário.");
        router.back();
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, user]);

  // ===== Validação simples =====
  function validate() {
    if (!title.trim()) return "Informe o título.";
    if (!subtitle.trim()) return "Informe o subtítulo.";
    if (!message.trim()) return "Informe a mensagem.";

    if (!categoryId) return "Selecione a categoria.";
    if (!statusId) return "Selecione o status.";

    if (image.trim()) {
      const okUrl = /^https?:\/\/.+/i.test(image.trim());
      if (!okUrl) return "Informe uma URL válida para a imagem (http/https).";
    }

    if (Number(statusId) === STATUS_PUBLICADO) {
      const iso = toISOFromUserInput(postedAtText.trim());
      if (!iso) return 'Informe "Postado em" no formato dd/MM/aaaa HH:mm (ex: 29/01/2026 14:30).';
      if (!postedById) return "Usuário inválido para postar (postedBy).";
    }

    if (!createdById) return "Usuário inválido para criar (createdBy).";

    return null;
  }

  async function handleSave() {
    const err = validate();
    if (err) {
      Alert.alert("Atenção", err);
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        message: message.trim(),
        image: image.trim() ? image.trim() : null,
        createdBy: Number(createdById),
        category: Number(categoryId),
        status: Number(statusId),
      };

      if (Number(statusId) === STATUS_PUBLICADO) {
        payload.postedBy = Number(postedById);
        payload.postedAt = toISOFromUserInput(postedAtText.trim());
      }

      if (isEdit) {
        await updatePost(String(id), payload);
        Alert.alert("Sucesso", "Post atualizado!");
        router.replace(`/(shell)/post/${String(id)}`);
      } else {
        const resp = await createPost(payload);

        // se o backend retornar o id do novo post:
        const created = resp?.data ?? resp;
        const newId = created?.id ?? created?.data?.id;

        Alert.alert("Sucesso", "Post criado!");

        if (newId) router.replace(`/(shell)/post/${String(newId)}`);
        else router.back();
      }
    } catch (e) {
      console.error("❌ erro ao salvar post:", e);
      Alert.alert("Erro", "Não foi possível salvar a postagem.");
    } finally {
      setSaving(false);
    }
  }

//   if (user) {
//     return (
//       <>
//         <Stack.Screen options={{ title: "Post" }} />
//         <View style={styles.center}>
//           <Text style={styles.centerText}>Acesso restrito.</Text>
//         </View>
//       </>
//     );
//   }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: isEdit ? "Editar Post" : "Novo Post" }} />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? "Editar Post" : "Novo Post" }} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>{isEdit ? "Editar Postagem" : "Nova Postagem"}</Text>
        <Text style={styles.h2}>Preencha os campos abaixo para {isEdit ? "atualizar" : "criar"} uma postagem.</Text>

        {/* Título */}
        <Text style={styles.label}>Título *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex: Introdução ao Expo Router" />

        {/* Subtítulo */}
        <Text style={styles.label}>Subtítulo *</Text>
        <TextInput style={styles.input} value={subtitle} onChangeText={setSubtitle} placeholder="Resumo breve do conteúdo..." />

        {/* Mensagem */}
        <Text style={styles.label}>Mensagem *</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={message}
          onChangeText={setMessage}
          placeholder="Escreva o conteúdo..."
          multiline
        />

        {/* Imagem */}
        <Text style={styles.label}>Imagem (URL)</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="https://..." autoCapitalize="none" />

        {/* Categoria */}
        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.pills}>
          {categories.map((c) => {
            const active = Number(categoryId) === Number(c.id);
            return (
              <TouchableOpacity key={c.id} onPress={() => setCategoryId(c.id)} style={[styles.pill, active && styles.pillActive]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{c.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Status */}
        <Text style={styles.label}>Status *</Text>
        <View style={styles.pills}>
          {statuses.map((s) => {
            const active = Number(statusId) === Number(s.id);
            return (
              <TouchableOpacity key={s.id} onPress={() => setStatusId(s.id)} style={[styles.pill, active && styles.pillActive]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Postado em: quando publicado */}
        {Number(statusId) === STATUS_PUBLICADO && (
          <>
            <Text style={styles.label}>Postado em * (dd/MM/aaaa HH:mm)</Text>
            <TextInput
              style={styles.input}
              value={postedAtText}
              onChangeText={setPostedAtText}
              placeholder="29/01/2026 14:30"
              autoCapitalize="none"
            />
            <Text style={styles.help}>
              Dica: depois a gente pode trocar isso por um DateTimePicker nativo para ficar perfeito no mobile.
            </Text>
          </>
        )}

        {/* Ações */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.btn, styles.btnLight]} onPress={() => router.back()} disabled={saving}>
            <Text style={[styles.btnText, styles.btnLightText]}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSave} disabled={saving}>
            <Text style={[styles.btnText, styles.btnPrimaryText]}>{saving ? "Salvando..." : "Salvar"}</Text>
          </TouchableOpacity>
        </View>

        {/* Debug opcional */}
        <Text style={styles.debug}>
          Categoria: {selectedCategory?.name ?? "-"} | Status: {selectedStatus?.name ?? "-"}
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16, gap: 10 },
  centerText: { color: "#333" },

  container: { padding: 16, gap: 10 },
  h1: { fontSize: 20, fontWeight: "900", color: "#111" },
  h2: { fontSize: 13, color: "#666", marginBottom: 8 },

  label: { fontSize: 12, color: "#666", fontWeight: "700", marginTop: 6 },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textarea: { minHeight: 180, textAlignVertical: "top" },

  pills: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 4 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: "#eee" },
  pillActive: { backgroundColor: "#000" },
  pillText: { fontSize: 13, color: "#333" },
  pillTextActive: { color: "#fff", fontWeight: "700" },

  help: { fontSize: 12, color: "#777", marginTop: 4 },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnText: { fontWeight: "900" },

  btnLight: { backgroundColor: "#eee" },
  btnLightText: { color: "#111" },

  btnPrimary: { backgroundColor: "#000" },
  btnPrimaryText: { color: "#fff" },

  debug: { fontSize: 11, color: "#999", marginTop: 6 },
});
