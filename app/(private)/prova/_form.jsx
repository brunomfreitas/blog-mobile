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

import { useAuth } from "../../../auth/AuthContext";
import { getCategories } from "../../../services/categoryService";
import { createProva, getProvaById, updateProva } from "../../../services/provaService";

const emptyItem = { categoryId: null, quantidade: "" };

export default function ProvaFormBase({ mode = "create" }) {
  const { id } = useLocalSearchParams();
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isCreate = mode === "create";

  const { user } = useAuth();
  const createdById = user?.personId ?? user?.person?.id ?? user?.id ?? null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [tempoProva, setTempoProva] = useState("");
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [categories, setCategories] = useState([]);

  const categoriesMap = useMemo(() => {
    const map = {};
    for (const c of categories) map[c.id] = c.name ?? c.nmCategory ?? `Categoria ${c.id}`;
    return map;
  }, [categories]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const catsResp = await getCategories();
        setCategories(catsResp?.data ?? []);

        if ((isEdit || isView) && id) {
          const resp = await getProvaById(String(id));
          const p = resp?.data ?? resp;

          setDescricao(p?.descricao ?? "");
		  setTempoProva(String(p?.tempoProva ?? ""));

          const loadedItems =
            Array.isArray(p?.itens) && p.itens.length
              ? p.itens.map((item) => ({
                  categoryId: item?.categoryId ?? item?.category ?? null,
                  quantidade: String(item?.quantidade ?? ""),
                }))
              : buildItemsFromQuestoes(p?.questoes ?? []);

          setItems(loadedItems.length ? loadedItems : [{ ...emptyItem }]);
        }
      } catch (e) {
        console.error("❌ Erro ao carregar prova:", e);
        Alert.alert("Erro", "Não foi possível carregar os dados da prova.");
        router.back();
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, isView]);

  function buildItemsFromQuestoes(questoes) {
    const counter = {};
    for (const q of questoes) {
      const categoryId = q?.category ?? null;
      if (categoryId == null) continue;
      counter[categoryId] = (counter[categoryId] ?? 0) + 1;
    }

    return Object.entries(counter).map(([categoryId, quantidade]) => ({
      categoryId: Number(categoryId),
      quantidade: String(quantidade),
    }));
  }

  function updateItem(index, patch) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }]);
  }

  function removeItem(index) {
    setItems((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function validate() {
    if (!descricao.trim()) return "Informe a descrição da prova.";
    if (!createdById && isCreate) return "Usuário inválido para criar a prova.";
    if (!Array.isArray(items) || items.length === 0) return "Adicione ao menos uma matéria.";
	if (!String(tempoProva).trim()) return "Informe o tempo da prova em minutos.";

	const tempo = Number(tempoProva);
	if (!Number.isInteger(tempo) || tempo <= 0) {
		return "O tempo da prova deve ser um número inteiro maior que zero.";
	}

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.categoryId == null) return `Selecione a matéria do item ${i + 1}.`;
      if (!String(item.quantidade).trim()) return `Informe a quantidade do item ${i + 1}.`;

      const qtd = Number(item.quantidade);
      if (!Number.isInteger(qtd) || qtd <= 0) {
        return `A quantidade do item ${i + 1} deve ser um número inteiro maior que zero.`;
      }
    }

    return null;
  }

  async function handleSave() {
    if (isView) return;

    const err = validate();
    if (err) {
      Alert.alert("Atenção", err);
      return;
    }

    try {
      setSaving(true);

      const payload = {
        descricao: descricao.trim(),
        createdBy: Number(createdById),
		tempoProva: Number(tempoProva),
        itens: items.map((item) => ({
          categoryId: Number(item.categoryId),
          quantidade: Number(item.quantidade),
        })),
      };

	  console.log('payload', payload);
	  
      if (isEdit) {
        await updateProva(String(id), payload);
        Alert.alert("Sucesso", "Prova atualizada!");
        router.replace(`/(private)/prova/view/${String(id)}`);
      } else {
        const resp = await createProva(payload);
        // const created = resp?.data ?? resp;
        // const newId = created?.id ?? created?.data?.id;

		router.replace(`/(private)/prova/manage`);

        // Alert.alert("Sucesso", "Prova gerada!");		
        // if (newId) router.replace(`/(private)/prova/view/${String(newId)}`);
        // else router.back();
      }
    } catch (e) {
      console.error("❌ Erro ao salvar prova:", e);
      Alert.alert("Erro", "Não foi possível salvar a prova.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: isView ? "Visualizar Prova" : isEdit ? "Editar Prova" : "Nova Prova",
          }}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: isView ? "Visualizar Prova" : isEdit ? "Editar Prova" : "Nova Prova",
        }}
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>
          {isView ? "Visualizar Prova" : isEdit ? "Editar Prova" : "Nova Prova"}
        </Text>

        <Text style={styles.h2}>
          {isView
            ? "Consulta dos dados da prova."
            : "Informe a descrição e as matérias com a quantidade de questões."}
        </Text>

		<Text style={styles.label}>Tempo da prova (minutos) *</Text>
		<TextInput
			style={[styles.input, isView && styles.inputReadonly]}
			value={tempoProva}
			onChangeText={(value) => setTempoProva(value.replace(/[^0-9]/g, ""))}
			placeholder="Ex: 50"
			keyboardType="numeric"
			editable={!isView}
		/>

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textareaSmall, isView && styles.inputReadonly]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Prova Multidisciplinar - 6º Ano"
          multiline
          editable={!isView}
        />

        <Text style={styles.label}>Itens da prova *</Text>

        <View style={{ gap: 12 }}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Text style={styles.itemTitle}>Item {index + 1}</Text>

              <Text style={styles.subLabel}>Matéria / Categoria *</Text>
              <View style={styles.pills}>
                {categories.map((c) => {
                  const catId = Number(c.id);
                  const active = Number(item.categoryId) === catId;

                  return (
                    <TouchableOpacity
                      key={catId}
                      onPress={() => !isView && updateItem(index, { categoryId: catId })}
                      disabled={isView}
                      style={[
                        styles.pill,
                        active && styles.pillActive,
                        isView && styles.pillReadonly,
                      ]}
                    >
                      <Text style={[styles.pillText, active && styles.pillTextActive]}>
                        {c.name ?? c.nmCategory ?? `Categoria ${catId}`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.subLabel}>Quantidade *</Text>
              <TextInput
                style={[styles.input, isView && styles.inputReadonly]}
                value={String(item.quantidade ?? "")}
                onChangeText={(value) =>
                  updateItem(index, { quantidade: value.replace(/[^0-9]/g, "") })
                }
                placeholder="Ex: 5"
                keyboardType="numeric"
                editable={!isView}
              />

              {!isView && items.length > 1 && (
                <TouchableOpacity
                  style={[styles.btn, styles.btnDanger, { marginTop: 10 }]}
                  onPress={() => removeItem(index)}
                >
                  <Text style={styles.btnDangerText}>Remover item</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {!isView && (
          <TouchableOpacity style={[styles.btn, styles.btnLight, { marginTop: 12 }]} onPress={addItem}>
            <Text style={[styles.btnText, styles.btnLightText]}>+ Adicionar matéria</Text>
          </TouchableOpacity>
        )}

        {isView && (
          <>
            <Text style={[styles.label, { marginTop: 16 }]}>Resumo</Text>
            <View style={styles.summaryCard}>
              {items.map((item, index) => (
                <Text key={index} style={styles.summaryText}>
                  {index + 1}. {categoriesMap[item.categoryId] ?? `Categoria ${item.categoryId}`} — {item.quantidade} questões
                </Text>
              ))}
            </View>
          </>
        )}

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnLight]}
            onPress={() => router.back()}
            disabled={saving}
          >
            <Text style={[styles.btnText, styles.btnLightText]}>
              {isView ? "Voltar" : "Cancelar"}
            </Text>
          </TouchableOpacity>

          {!isView && (
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={[styles.btnText, styles.btnPrimaryText]}>
                {saving ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
  subLabel: { fontSize: 12, color: "#666", fontWeight: "700", marginTop: 4 },

  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputReadonly: {
    backgroundColor: "#f7f7f7",
    color: "#666",
  },
  textareaSmall: { minHeight: 90, textAlignVertical: "top" },

  itemCard: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
    gap: 8,
  },
  itemTitle: { fontSize: 15, fontWeight: "800", color: "#111" },

  pills: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 4 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: "#eee" },
  pillActive: { backgroundColor: "#000" },
  pillReadonly: { opacity: 1 },
  pillText: { fontSize: 13, color: "#333" },
  pillTextActive: { color: "#fff", fontWeight: "700" },

  summaryCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  summaryText: { color: "#333", fontSize: 14 },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnText: { fontWeight: "900" },

  btnLight: { backgroundColor: "#eee" },
  btnLightText: { color: "#111" },

  btnPrimary: { backgroundColor: "#000" },
  btnPrimaryText: { color: "#fff" },

  btnDanger: { backgroundColor: "#ffe5e5" },
  btnDangerText: { color: "#c1121f", fontWeight: "800" },
});