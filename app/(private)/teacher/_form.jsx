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

import { createPerson, getPersonById, updatePerson } from "../../../services/personService";
import { brToIso, isoToBr, maskDate } from "../../../utils/date";

function isValidCpfLoose(cpf) {
  // validação simples (só tamanho). Se quiser eu te passo validação completa.
  const only = (cpf || "").replace(/\D/g, "");
  return only.length === 11;
}

function isValidBirth(birth) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(birth || "");
}

export default function TeacherForm() {
  const { id } = useLocalSearchParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth, setBirth] = useState(""); // YYYY-MM-DD
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true); // se quiser um switch depois, a gente coloca

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (isEdit) {
          const resp = await getPersonById(String(id));
          const t = resp?.data ?? resp;

          setName(t?.name ?? "");
          setCpf(t?.cpf ?? "");
          setBirth(isoToBr(t?.birth));
          setEmail(t?.email ?? "");
          setStatus(Boolean(t?.status));
        } else {
          // defaults
          setStatus(true);
        }
      } catch (e) {
        console.log("❌ Erro ao carregar professor:", e);
        Alert.alert("Erro", "Não foi possível carregar o formulário.");
        router.back();
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  function validate() {
    if (!name.trim()) return "Informe o nome.";
    if (!cpf.trim()) return "Informe o CPF.";
    if (!isValidCpfLoose(cpf)) return "CPF inválido (precisa ter 11 dígitos).";
    if (!birth.trim()) return "Informe a data de nascimento.";
    if (!isValidBirth(birth)) return 'Data inválida. Use "YYYY-MM-DD" (ex: 2026-02-04).';

    if (email.trim()) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!ok) return "Email inválido.";
    }

    return null;
  }

  async function handleSave() {
    const err = validate();
    if (err) return Alert.alert("Atenção", err);

    try {
      setSaving(true);

      const payload = {
		id: Number(id),
        name: name.trim(),
        cpf: cpf.trim(),
        birth: brToIso(birth.trim()),
        email: email.trim() ? email.trim() : null,
        status: Boolean(status),
        type_person: "P",
      };

      if (isEdit) {
        await updatePerson(String(id), payload);
        Alert.alert("Sucesso", "Professor atualizado!");
      } else {
        await createPerson(payload);
        Alert.alert("Sucesso", "Professor cadastrado!");
      }

      router.replace("/(private)/teacher/manage");
    } catch (e) {
      console.log("❌ Erro ao salvar professor:", e);
      Alert.alert("Erro", "Não foi possível salvar o professor.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: isEdit ? "Editar Professor" : "Novo Professor" }} />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? "Editar Professor" : "Novo Professor" }} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>{isEdit ? "Editar Professor" : "Novo Professor"}</Text>
        <Text style={styles.h2}>Preencha os dados abaixo.</Text>

        <Text style={styles.label}>Nome *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome completo" />

        <Text style={styles.label}>CPF *</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholder="Somente números ou formatado"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Nascimento (DD/MM/AAAA) *</Text>
        <TextInput
			placeholder="Nascimento (DD/MM/AAAA)"
			value={birth}
			onChangeText={(text) => setBirth(maskDate(text))}
			keyboardType="numeric"
			maxLength={10}
			style={styles.input}
		/>
		
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="user@example.com"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={saving}>
          <Text style={styles.btnText}>{saving ? "Salvando..." : "Salvar"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  h1: { fontSize: 20, fontWeight: "900" },
  h2: { fontSize: 13, color: "#666", marginBottom: 8 },
  label: { fontSize: 12, color: "#666", fontWeight: "700" },
  input: { backgroundColor: "#f1f1f1", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  helper: { fontSize: 12, color: "#666", marginTop: 4 },
  btn: { marginTop: 10, backgroundColor: "#000", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "900" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  centerText: { color: "#666" },
});
