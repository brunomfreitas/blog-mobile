// app/login.jsx
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { signIn } = useAuth();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    if (!loginValue.trim()) return "Informe o login.";
    if (!password || password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    return null;
  }

  async function handleLogin() {
    const err = validate();
    if (err) {
      Alert.alert("Atenção", err);
      return;
    }

    try {
      setSubmitting(true);
      await signIn(loginValue.trim(), password);
		console.log('logou !!!!')
      router.replace("/(private)/post/manage");
    } catch (e) {
      console.log("login error:", e);
      Alert.alert("Erro", "Login inválido ou erro ao autenticar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>        

        <Text style={styles.label}>Login</Text>
        <TextInput
          value={loginValue}
          onChangeText={setLoginValue}
          placeholder="Seu login"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={submitting}>
          <Text style={styles.btnText}>{submitting ? "Acessando..." : "Acessar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(shell)")}>
          <Text style={styles.link}>Voltar para o Feed</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "900", color: "#111", textAlign: "center", marginBottom: 30 },
  subtitle: { marginTop: 6, fontSize: 14, color: "#666", marginBottom: 18 },

  label: { fontSize: 12, color: "#666", fontWeight: "700", marginTop: 10 },
  input: {
    marginTop: 6,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  btn: {
    marginTop: 18,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "800" },

  link: { marginTop: 14, textAlign: "center", color: "#111", fontWeight: "700" },
});
