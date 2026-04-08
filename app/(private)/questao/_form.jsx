// import { Stack, router, useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import {
// 	ActivityIndicator,
// 	Alert,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";

// import { useAuth } from "../../../auth/AuthContext";
// import escolaridades from "../../../constants/escolaridade";
// import periodos from "../../../constants/periodo";
// import tipoQuestoes from "../../../constants/tipo-questao";
// import turnos from "../../../constants/turno";
// import { getAlternativasByQuestaoId } from "../../../services/alternativaService";
// import { getCategories } from "../../../services/categoryService";
// import { createQuestao, getQuestaoById, updateQuestao } from "../../../services/questaoService";

// const defaultAlternativas = [
//   { id: null, letra: "A", alternativa: "" },
//   { id: null, letra: "B", alternativa: "" },
//   { id: null, letra: "C", alternativa: "" },
//   { id: null, letra: "D", alternativa: "" },
//   { id: null, letra: "E", alternativa: "" },
// ];

// function normalizeAlternativas(alternativasApi = []) {
//   return ["A", "B", "C", "D", "E"].map((letra) => {
//     const found = alternativasApi.find((item) => {
//       const txt = String(item?.alternativa ?? "");
//       return txt.trim().startsWith(`(${letra})`);
//     });

//     return {
//       id: found?.id ?? null,
//       letra,
//       alternativa: found
//         ? String(found.alternativa).replace(new RegExp(`^\\(${letra}\\)\\s*`), "")
//         : "",
//     };
//   });
// }

// export default function QuestaoFormBase({ mode = "create" }) {
//   const { id } = useLocalSearchParams();
//   const isEdit = mode === "edit";
//   const isView = mode === "view";
//   const isCreate = mode === "create";

//   const { user } = useAuth();
//   const createdById = user?.personId ?? user?.person?.id ?? user?.id ?? null;

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [enunciado, setEnunciado] = useState("");
//   const [resposta, setResposta] = useState("");
//   const [escolaridade, setEscolaridade] = useState(null);
//   const [turno, setTurno] = useState(null);
//   const [periodo, setPeriodo] = useState(null);
//   const [tipoQuestao, setTipoQuestao] = useState(null);
//   const [status, setStatus] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [categoryId, setCategoryId] = useState(null);
//   const [alternativas, setAlternativas] = useState([...defaultAlternativas]);

//   useEffect(() => {
// 	(async () => {
// 		try {
// 		setLoading(true);

// 		const [catsResp] = await Promise.all([getCategories()]);
// 		setCategories(catsResp?.data ?? []);

// 		if ((isEdit || isView) && id) {
// 			const [questaoResp, alternativasResp] = await Promise.all([
// 			getQuestaoById(String(id)),
// 			getAlternativasByQuestaoId(String(id)),
// 			]);

// 			const p = questaoResp?.data ?? questaoResp;
// 			const alternativasApi = Array.isArray(alternativasResp)
// 			? alternativasResp
// 			: alternativasResp?.data ?? [];

// 			setEnunciado(p?.enunciado ?? "");
// 			setResposta(String(p?.resposta ?? "").toUpperCase());
// 			setEscolaridade(p?.escolaridade ?? null);
// 			setTurno(p?.turno ?? null);
// 			setPeriodo(p?.periodo ?? null);
// 			setTipoQuestao(p?.tipoQuestao ?? null);
// 			setStatus(p?.status ?? null);
// 			setCategoryId(p?.category ?? p?.postCategory?.id ?? null);

// 			setAlternativas(normalizeAlternativas(alternativasApi));
// 		} else {
// 			setAlternativas(defaultAlternativas);
// 		}
// 		} catch (e) {
// 		console.error("❌ Erro ao carregar form:", e);
// 		Alert.alert("Erro", "Não foi possível carregar os dados do formulário.");
// 		router.back();
// 		} finally {
// 		setLoading(false);
// 		}
// 	})();
//   }, [id, isEdit, isView]);

//   function updateAlternativa(index, value) {
//     setAlternativas((prev) =>
//       prev.map((item, i) =>
//         i === index ? { ...item, alternativa: value } : item
//       )
//     );
//   }

//   function validate() {
//     if (!enunciado.trim()) return "Informe o enunciado.";
//     if (!resposta.trim()) return "Informe a resposta correta.";
//     if (!["A", "B", "C", "D", "E"].includes(resposta.trim().toUpperCase())) {
//       return "A resposta correta deve ser A, B, C, D ou E.";
//     }
//     if (escolaridade == null) return "Informe a escolaridade.";
//     if (turno == null) return "Informe o turno.";
//     if (periodo == null) return "Informe o período.";
//     if (tipoQuestao == null) return "Informe o tipo de questão.";
//     if (status == null) return "Selecione o status.";
//     if (categoryId == null) return "Selecione a categoria.";
//     if (!createdById && isCreate) return "Usuário inválido para criar (createdBy).";

//     for (let i = 0; i < alternativas.length; i++) {
//       if (!alternativas[i].alternativa.trim()) {
//         return `Informe o texto da alternativa ${alternativas[i].letra}.`;
//       }
//     }

//     return null;
//   }

//   async function handleSave() {
//     if (isView) return;

//     const err = validate();
//     if (err) {
//       Alert.alert("Atenção", err);
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
// 			enunciado: enunciado.trim(),
// 			resposta: resposta.trim().toUpperCase(),
// 			escolaridade: Number(escolaridade),
// 			turno: Number(turno),
// 			periodo: Number(periodo),
// 			tipoQuestao: Number(tipoQuestao),
// 			createdBy: Number(createdById),
// 			category: Number(categoryId),
// 			status,
// 			alternativas: alternativas.map((item) => ({
// 				id: item.id ?? null,
// 				letra: item.letra,
// 				alternativa: `(${item.letra}) ${item.alternativa.trim()}`,
// 			})),
// 		};

//       if (isEdit) {
//         await updateQuestao(String(id), payload);
//         Alert.alert("Sucesso", "Questão atualizada!");
//         router.replace(`/(private)/questao/edit/${String(id)}`);
//       } else {
//         const resp = await createQuestao(payload);
//         const created = resp?.data ?? resp;
//         const newId = created?.id ?? created?.data?.id;

//         Alert.alert("Sucesso", "Questão criada!");

//         if (newId) router.replace(`/(private)/questao/${String(newId)}`);
//         else router.back();
//       }
//     } catch (e) {
//       console.error("❌ erro ao salvar questão:", e);
//       Alert.alert("Erro", "Não foi possível salvar a questão.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) {
//     return (
//       <>
//         <Stack.Screen
//           options={{
//             title: isView ? "Visualizar Questão" : isEdit ? "Editar Questão" : "Nova Questão",
//           }}
//         />
//         <View style={styles.center}>
//           <ActivityIndicator size="large" />
//           <Text style={styles.centerText}>Carregando...</Text>
//         </View>
//       </>
//     );
//   }

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: isView ? "Visualizar Questão" : isEdit ? "Editar Questão" : "Nova Questão",
//         }}
//       />

//       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//         <Text style={styles.h1}>
//           {isView ? "Visualizar Questão" : isEdit ? "Editar Questão" : "Nova Questão"}
//         </Text>

//         <Text style={styles.h2}>
//           {isView
//             ? "Consulta dos dados da questão."
//             : `Preencha os campos abaixo para ${isEdit ? "atualizar" : "criar"} uma questão.`}
//         </Text>

//         <Text style={styles.label}>Enunciado *</Text>
//         <TextInput
//           style={[styles.input, styles.textarea, isView && styles.inputReadonly]}
//           value={enunciado}
//           onChangeText={setEnunciado}
//           placeholder="Enunciado da questão ..."
//           multiline
//           editable={!isView}
//         />

//         <Text style={styles.label}>Resposta correta *</Text>
//         <TextInput
//           style={[styles.input, isView && styles.inputReadonly]}
//           value={resposta}
//           onChangeText={(value) => setResposta(value.toUpperCase().replace(/[^A-E]/g, ""))}
//           placeholder="Ex: A"
//           editable={!isView}
//           maxLength={1}
//         />

//         <Text style={styles.label}>Alternativas *</Text>
//         <View style={{ gap: 10 }}>
//           {alternativas.map((item, index) => (
//             <View key={item.letra}>
//               <Text style={styles.subLabel}>Alternativa {item.letra}</Text>
//               <TextInput
//                 style={[styles.input, isView && styles.inputReadonly]}
//                 value={item.alternativa}
//                 onChangeText={(value) => updateAlternativa(index, value)}
//                 placeholder={`Texto da alternativa ${item.letra}`}
//                 editable={!isView}
//                 multiline
//               />
//             </View>
//           ))}
//         </View>

//         <Text style={styles.label}>Séries *</Text>
//         <View style={styles.pills}>
//           {escolaridades.map((s) => {
//             const active = Number(escolaridade) === Number(s.id);
//             return (
//               <TouchableOpacity
//                 key={s.id}
//                 onPress={() => !isView && setEscolaridade(s.id)}
//                 disabled={isView}
//                 style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
//               >
//                 <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <Text style={styles.label}>Turno *</Text>
//         <View style={styles.pills}>
//           {turnos.map((s) => {
//             const active = Number(turno) === Number(s.id);
//             return (
//               <TouchableOpacity
//                 key={s.id}
//                 onPress={() => !isView && setTurno(s.id)}
//                 disabled={isView}
//                 style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
//               >
//                 <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <Text style={styles.label}>Período *</Text>
//         <View style={styles.pills}>
//           {periodos.map((s) => {
//             const active = Number(periodo) === Number(s.id);
//             return (
//               <TouchableOpacity
//                 key={s.id}
//                 onPress={() => !isView && setPeriodo(s.id)}
//                 disabled={isView}
//                 style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
//               >
//                 <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <Text style={styles.label}>Tipo Questão *</Text>
//         <View style={styles.pills}>
//           {tipoQuestoes.map((s) => {
//             const active = Number(tipoQuestao) === Number(s.id);
//             return (
//               <TouchableOpacity
//                 key={s.id}
//                 onPress={() => !isView && setTipoQuestao(s.id)}
//                 disabled={isView}
//                 style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
//               >
//                 <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <Text style={styles.label}>Categoria *</Text>
//         <View style={styles.pills}>
//           {categories.map((c) => {
//             const active = Number(categoryId) === Number(c.id);
//             return (
//               <TouchableOpacity
//                 key={c.id}
//                 onPress={() => !isView && setCategoryId(c.id)}
//                 disabled={isView}
//                 style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
//               >
//                 <Text style={[styles.pillText, active && styles.pillTextActive]}>{c.name}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <Text style={styles.label}>Status *</Text>
//         <View style={styles.pills}>
//           <TouchableOpacity
//             onPress={() => !isView && setStatus(true)}
//             disabled={isView}
//             style={[styles.pill, status === true && styles.pillActive, isView && styles.pillReadonly]}
//           >
//             <Text style={[styles.pillText, status === true && styles.pillTextActive]}>Ativo</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => !isView && setStatus(false)}
//             disabled={isView}
//             style={[styles.pill, status === false && styles.pillActive, isView && styles.pillReadonly]}
//           >
//             <Text style={[styles.pillText, status === false && styles.pillTextActive]}>
//               Inativo
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.actionsRow}>
//           <TouchableOpacity
//             style={[styles.btn, styles.btnLight]}
//             onPress={() => router.back()}
//             disabled={saving}
//           >
//             <Text style={[styles.btnText, styles.btnLightText]}>
//               {isView ? "Voltar" : "Cancelar"}
//             </Text>
//           </TouchableOpacity>

//           {!isView && (
//             <TouchableOpacity
//               style={[styles.btn, styles.btnPrimary]}
//               onPress={handleSave}
//               disabled={saving}
//             >
//               <Text style={[styles.btnText, styles.btnPrimaryText]}>
//                 {saving ? "Salvando..." : "Salvar"}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16, gap: 10 },
//   centerText: { color: "#333" },

//   container: { padding: 16, gap: 10 },
//   h1: { fontSize: 20, fontWeight: "900", color: "#111" },
//   h2: { fontSize: 13, color: "#666", marginBottom: 8 },

//   label: { fontSize: 12, color: "#666", fontWeight: "700", marginTop: 6 },
//   subLabel: { fontSize: 12, color: "#666", fontWeight: "700", marginBottom: 4 },

//   input: {
//     backgroundColor: "#f1f1f1",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   inputReadonly: {
//     backgroundColor: "#f7f7f7",
//     color: "#666",
//   },
//   textarea: { minHeight: 180, textAlignVertical: "top" },

//   pills: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 4 },
//   pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: "#eee" },
//   pillActive: { backgroundColor: "#000" },
//   pillReadonly: { opacity: 1 },
//   pillText: { fontSize: 13, color: "#333" },
//   pillTextActive: { color: "#fff", fontWeight: "700" },

//   actionsRow: { flexDirection: "row", gap: 10, marginTop: 10 },
//   btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
//   btnText: { fontWeight: "900" },

//   btnLight: { backgroundColor: "#eee" },
//   btnLightText: { color: "#111" },

//   btnPrimary: { backgroundColor: "#000" },
//   btnPrimaryText: { color: "#fff" },
// });


import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import escolaridades from "../../../constants/escolaridade";
import periodos from "../../../constants/periodo";
import tipoQuestoes from "../../../constants/tipo-questao";
import turnos from "../../../constants/turno";
import {
	createAlternativa,
	getAlternativasByQuestaoId,
	updateAlternativa,
} from "../../../services/alternativaService";
import { getCategories } from "../../../services/categoryService";
import {
	createQuestao,
	getQuestaoById,
	updateQuestao,
} from "../../../services/questaoService";

const defaultAlternativas = [
  { id: null, letra: "A", alternativa: "" },
  { id: null, letra: "B", alternativa: "" },
  { id: null, letra: "C", alternativa: "" },
  { id: null, letra: "D", alternativa: "" },
  { id: null, letra: "E", alternativa: "" },
];

function normalizeAlternativas(alternativasApi = []) {
  return ["A", "B", "C", "D", "E"].map((letra) => {
    const found = alternativasApi.find((item) => {
      const txt = String(item?.alternativa ?? "");
      return txt.trim().startsWith(`(${letra})`);
    });

    return {
      id: found?.id ?? null,
      letra,
      alternativa: found
        ? String(found.alternativa).replace(new RegExp(`^\\(${letra}\\)\\s*`), "")
        : "",
    };
  });
}

export default function QuestaoFormBase({ mode = "create" }) {
  const { id } = useLocalSearchParams();
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isCreate = mode === "create";

  const { user } = useAuth();
  const createdById = user?.personId ?? user?.person?.id ?? user?.id ?? null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [enunciado, setEnunciado] = useState("");
  const [resposta, setResposta] = useState("");
  const [escolaridade, setEscolaridade] = useState(null);
  const [turno, setTurno] = useState(null);
  const [periodo, setPeriodo] = useState(null);
  const [tipoQuestao, setTipoQuestao] = useState(null);
  const [status, setStatus] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [alternativas, setAlternativas] = useState([...defaultAlternativas]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [catsResp] = await Promise.all([getCategories()]);
        setCategories(catsResp?.data ?? []);

        if ((isEdit || isView) && id) {
          const [questaoResp, alternativasResp] = await Promise.all([
            getQuestaoById(String(id)),
            getAlternativasByQuestaoId(String(id)),
          ]);

          const p = questaoResp?.data ?? questaoResp;
          const alternativasApi = Array.isArray(alternativasResp)
            ? alternativasResp
            : alternativasResp?.data ?? [];

          setEnunciado(p?.enunciado ?? "");
          setResposta(String(p?.resposta ?? "").toUpperCase());
          setEscolaridade(p?.escolaridade ?? null);
          setTurno(p?.turno ?? null);
          setPeriodo(p?.periodo ?? null);
          setTipoQuestao(p?.tipoQuestao ?? null);
          setStatus(p?.status ?? null);
          setCategoryId(p?.category ?? p?.postCategory?.id ?? null);

          setAlternativas(normalizeAlternativas(alternativasApi));
        } else {
          setAlternativas([...defaultAlternativas]);
        }
      } catch (e) {
        console.error("❌ Erro ao carregar form:", e);
        Alert.alert("Erro", "Não foi possível carregar os dados do formulário.");
        router.replace(`/(private)/questao/manage`);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, isView]);

  function updateAlternativaText(index, value) {
    setAlternativas((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, alternativa: value } : item
      )
    );
  }

  function validate() {
    if (!enunciado.trim()) return "Informe o enunciado.";
    if (!resposta.trim()) return "Informe a resposta correta.";
    if (!["A", "B", "C", "D", "E"].includes(resposta.trim().toUpperCase())) {
      return "A resposta correta deve ser A, B, C, D ou E.";
    }
    if (escolaridade == null) return "Informe a escolaridade.";
    if (turno == null) return "Informe o turno.";
    if (periodo == null) return "Informe o período.";
    if (tipoQuestao == null) return "Informe o tipo de questão.";
    if (status == null) return "Selecione o status.";
    if (categoryId == null) return "Selecione a categoria.";
    if (!createdById && isCreate) return "Usuário inválido para criar.";

    for (let i = 0; i < alternativas.length; i++) {
      if (!alternativas[i].alternativa.trim()) {
        return `Informe o texto da alternativa ${alternativas[i].letra}.`;
      }
    }

    return null;
  }

  async function persistAlternativas(questaoId) {
    const ops = alternativas.map((item) => {
      const payload = {
        alternativa: `(${item.letra}) ${item.alternativa.trim()}`,
        questaoId: Number(questaoId),
      };

      if (item.id) {
        return updateAlternativa(item.id, payload);
      }

      return createAlternativa(payload);
    });

    await Promise.all(ops);
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

      const questaoPayload = {
        enunciado: enunciado.trim(),
        resposta: resposta.trim().toUpperCase(),
        escolaridade: Number(escolaridade),
        turno: Number(turno),
        periodo: Number(periodo),
        tipoQuestao: Number(tipoQuestao),
        createdBy: Number(createdById),
        category: Number(categoryId),
        status,
      };

      if (isEdit) {
        const updated = await updateQuestao(String(id), questaoPayload);
        const questaoId = updated?.id ?? updated?.data?.id ?? Number(id);

        await persistAlternativas(questaoId);

        Alert.alert("Sucesso", "Questão atualizada!");
        router.replace(`/(private)/questao/edit/${String(questaoId)}`);
      } else {
        const created = await createQuestao(questaoPayload);
        const questaoId = created?.id ?? created?.data?.id;

        if (!questaoId) {
          throw new Error("Questão criada sem ID retornado.");
        }

        await persistAlternativas(questaoId);

        Alert.alert("Sucesso", "Questão criada!");
        router.replace(`/(private)/questao/edit/${String(questaoId)}`);
      }
    } catch (e) {
      console.error("❌ erro ao salvar questão:", e);
      Alert.alert("Erro", "Não foi possível salvar a questão.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: isView ? "Visualizar Questão" : isEdit ? "Editar Questão" : "Nova Questão",
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
          title: isView ? "Visualizar Questão" : isEdit ? "Editar Questão" : "Nova Questão",
        }}
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>
          {isView ? "Visualizar Questão" : isEdit ? "Editar Questão" : "Nova Questão"}
        </Text>

        <Text style={styles.h2}>
          {isView
            ? "Consulta dos dados da questão."
            : `Preencha os campos abaixo para ${isEdit ? "atualizar" : "criar"} uma questão.`}
        </Text>

        <Text style={styles.label}>Enunciado *</Text>
        <TextInput
          style={[styles.input, styles.textarea, isView && styles.inputReadonly]}
          value={enunciado}
          onChangeText={setEnunciado}
          placeholder="Enunciado da questão ..."
          multiline
          editable={!isView}
        />

        <Text style={styles.label}>Resposta correta *</Text>
        <TextInput
          style={[styles.input, isView && styles.inputReadonly]}
          value={resposta}
          onChangeText={(value) => setResposta(value.toUpperCase().replace(/[^A-E]/g, ""))}
          placeholder="Ex: A"
          editable={!isView}
          maxLength={1}
        />

        <Text style={styles.label}>Alternativas *</Text>
        <View style={{ gap: 10 }}>
          {alternativas.map((item, index) => (
            <View key={item.letra}>
              <Text style={styles.subLabel}>Alternativa {item.letra}</Text>
              <TextInput
                style={[styles.input, isView && styles.inputReadonly]}
                value={item.alternativa}
                onChangeText={(value) => updateAlternativaText(index, value)}
                placeholder={`Texto da alternativa ${item.letra}`}
                editable={!isView}
                multiline
              />
            </View>
          ))}
        </View>

        <Text style={styles.label}>Séries *</Text>
        <View style={styles.pills}>
          {escolaridades.map((s) => {
            const active = Number(escolaridade) === Number(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => !isView && setEscolaridade(s.id)}
                disabled={isView}
                style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Turno *</Text>
        <View style={styles.pills}>
          {turnos.map((s) => {
            const active = Number(turno) === Number(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => !isView && setTurno(s.id)}
                disabled={isView}
                style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Período *</Text>
        <View style={styles.pills}>
          {periodos.map((s) => {
            const active = Number(periodo) === Number(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => !isView && setPeriodo(s.id)}
                disabled={isView}
                style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Tipo Questão *</Text>
        <View style={styles.pills}>
          {tipoQuestoes.map((s) => {
            const active = Number(tipoQuestao) === Number(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => !isView && setTipoQuestao(s.id)}
                disabled={isView}
                style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{s.nome}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.pills}>
          {categories.map((c) => {
            const active = Number(categoryId) === Number(c.id);
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => !isView && setCategoryId(c.id)}
                disabled={isView}
                style={[styles.pill, active && styles.pillActive, isView && styles.pillReadonly]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{c.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Status *</Text>
        <View style={styles.pills}>
          <TouchableOpacity
            onPress={() => !isView && setStatus(true)}
            disabled={isView}
            style={[styles.pill, status === true && styles.pillActive, isView && styles.pillReadonly]}
          >
            <Text style={[styles.pillText, status === true && styles.pillTextActive]}>Ativo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => !isView && setStatus(false)}
            disabled={isView}
            style={[styles.pill, status === false && styles.pillActive, isView && styles.pillReadonly]}
          >
            <Text style={[styles.pillText, status === false && styles.pillTextActive]}>
              Inativo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnLight]}
            onPress={() => router.replace(`/(private)/questao/manage`)}
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
  subLabel: { fontSize: 12, color: "#666", fontWeight: "700", marginBottom: 4 },

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
  textarea: { minHeight: 180, textAlignVertical: "top" },

  pills: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 4 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: "#eee" },
  pillActive: { backgroundColor: "#000" },
  pillReadonly: { opacity: 1 },
  pillText: { fontSize: 13, color: "#333" },
  pillTextActive: { color: "#fff", fontWeight: "700" },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnText: { fontWeight: "900" },

  btnLight: { backgroundColor: "#eee" },
  btnLightText: { color: "#111" },

  btnPrimary: { backgroundColor: "#000" },
  btnPrimaryText: { color: "#fff" },
});

