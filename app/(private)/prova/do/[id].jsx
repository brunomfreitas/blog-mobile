import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../../../../auth/AuthContext";
import {
	finishProvaAluno,
	getProvaById,
	saveManyProvaAlunoResposta,
	startProvaAluno,
} from "../../../../services/provaService";

function formatTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function extractLetter(text = "") {
  const match = String(text).match(/\(([A-E])\)/i);
  return match?.[1]?.toUpperCase() ?? null;
}

export default function DoProvaScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const alunoId =
    user?.personId ??
    user?.person?.id ??
    user?.id ??
    null;

  const [loading, setLoading] = useState(true);
  const [prova, setProva] = useState(null);

  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const [elapsed, setElapsed] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [result, setResult] = useState(null);
  const [provaAlunoId, setProvaAlunoId] = useState(null);
  const [status, setStatus] = useState("PENDENTE");

  const timerRef = useRef(null);
  const autoFinishedRef = useRef(false);

  const questoes = useMemo(() => {
    return Array.isArray(prova?.questoes) ? prova.questoes : [];
  }, [prova]);

  async function loadProva() {
  try {
    setLoading(true);

    const data = await getProvaById(String(id), { alunoId });

    setProva(data);

    const tempo = Number(data?.tempoProva ?? 0);
    setRemaining(tempo * 60);
    setElapsed(0);

    const provaAluno = data?.provaAluno ?? null;
    const respostasAluno = Array.isArray(data?.respostasAluno) ? data.respostasAluno : [];

    if (provaAluno) {
      setProvaAlunoId(provaAluno.id);
      setStatus(provaAluno.status ?? "PENDENTE");

      const locked =
        provaAluno.status === "FINALIZADA" ||
        provaAluno.status === "EXPIRADA";

      setFinished(locked);

      if (locked) {
        setResult({
          nota: Number(provaAluno?.nota ?? 0),
          tempoGasto: Number(provaAluno?.tempoGasto ?? 0),
        });
      }
    } else {
      setFinished(false);
      setStatus("PENDENTE");
    }

    // reconstruir respostas marcadas
    if (respostasAluno.length > 0 && Array.isArray(data?.questoes)) {
      const rebuiltAnswers = {};

      for (const resposta of respostasAluno) {
        const questao = data.questoes.find(
          (q) => Number(q.questaoId ?? q.id) === Number(resposta.questaoId)
        );

        if (!questao) continue;

        const alternativa = (questao.alternativas ?? []).find(
          (alt) => Number(alt.id) === Number(resposta.alternativaId)
        );

        if (!alternativa) continue;

        const key = String(questao.questaoId ?? questao.id);
        rebuiltAnswers[key] = alternativa;
      }

      setAnswers(rebuiltAnswers);
    }
  } catch (e) {
    console.log("❌ erro carregar prova", e);
    Alert.alert("Erro", "Não foi possível carregar a prova");
    router.back();
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadProva();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [id, alunoId]);

  useEffect(() => {
    if (loading) return;
    if (!prova?.id) return;
    if (!alunoId) return;
    if (provaAlunoId) return;
    if (finished) return;

    handleStartProvaAluno();
  }, [loading, prova?.id, alunoId, provaAlunoId, finished]);

  async function handleStartProvaAluno() {
    try {
      const started = await startProvaAluno({
        provaId: Number(prova.id),
        alunoId: Number(alunoId),
      });

      setProvaAlunoId(started?.id ?? null);
      setStatus(started?.status ?? "EM_ANDAMENTO");
    } catch (e) {
      console.log("❌ erro iniciar prova_aluno", e);
    }
  }

  useEffect(() => {
    if (loading || finished) return;
    if (remaining <= 0) return;

    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);

      setRemaining((prev) => {
        const next = prev - 1;

        if (next <= 0 && !autoFinishedRef.current) {
          autoFinishedRef.current = true;

          setTimeout(() => {
            finalizeExamInternal("timeout");
          }, 0);

          return 0;
        }

        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, finished, remaining]);

  function selectAlternative(q, alt) {
    const locked = status === "FINALIZADA" || status === "EXPIRADA";

    if (locked || finished || remaining <= 0) return;

    const key = String(q.questaoId ?? q.id);

    setAnswers((prev) => ({
      ...prev,
      [key]: alt,
    }));
  }

  function calculateResult() {
    let acertos = 0;
    const total = questoes.length;

    for (const q of questoes) {
      const key = String(q.questaoId ?? q.id);
      const marcada = extractLetter(answers[key]?.alternativa);
      const correta = String(q.resposta ?? "").toUpperCase();

      if (marcada && marcada === correta) acertos++;
    }

    return {
      total,
      acertos,
      erros: total - acertos,
      nota: total > 0 ? (acertos / total) * 10 : 0,
    };
  }

  function finalizeExam() {
    if (finished) return;

    if (Platform.OS === "web") {
      const ok = window.confirm(
        "Depois de finalizar, você não poderá alterar suas respostas. Deseja continuar?"
      );

      if (!ok) return;

      finalizeExamInternal("manual");
      return;
    }

    Alert.alert(
      "Finalizar prova",
      "Depois de finalizar, você não poderá alterar suas respostas. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Finalizar", onPress: () => finalizeExamInternal("manual") },
      ]
    );
  }

  async function finalizeExamInternal(reason = "manual") {
    if (finished) return;
    if (!provaAlunoId) {
      Alert.alert("Erro", "A prova do aluno ainda não foi inicializada.");
      return;
    }

    if (timerRef.current) clearInterval(timerRef.current);

    const calc = calculateResult();
    const finalStatus = reason === "timeout" ? "EXPIRADA" : "FINALIZADA";

    try {
      await finishProvaAluno({
        provaId: Number(prova.id),
        alunoId: Number(alunoId),
        status: finalStatus,
        nota: calc.nota,
        tempoGasto: elapsed,
      });

      const respostasPayload = questoes.map((q) => {
        const key = String(q.questaoId ?? q.id);
        const marcada = answers[key];

        const respostaLetra = extractLetter(marcada?.alternativa);
        const correta =
          respostaLetra === String(q.resposta ?? "").toUpperCase();

        return {
          provaAlunoId: Number(provaAlunoId),
          questaoId: Number(q.questaoId ?? q.id),
          alternativaId: marcada?.id ?? null,
          respostaLetra: respostaLetra ?? null,
          correta,
        };
      });

      await saveManyProvaAlunoResposta(respostasPayload);

      setResult({
        ...calc,
        tempoGasto: elapsed,
      });

      setStatus(finalStatus);
      setFinished(true);

      Alert.alert(
        reason === "timeout" ? "Tempo encerrado" : "Prova finalizada",
        `Nota: ${calc.nota.toFixed(1)}\nAcertos: ${calc.acertos}/${calc.total}`
      );
    } catch (e) {
      console.log("❌ erro finalizar prova", e);
      Alert.alert("Erro", "Não foi possível finalizar a prova.");
    }
  }

  function isSelected(q, alt) {
    const key = String(q.questaoId ?? q.id);
    return answers[key]?.id === alt.id;
  }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Responder Prova" }} />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Responder Prova" }} />

      <View style={styles.screen}>
        <View style={styles.timer}>
          <Text style={styles.timerMain}>{formatTime(remaining)}</Text>
          <Text style={styles.timerSub}>Decorrido: {formatTime(elapsed)}</Text>
        </View>

        <ScrollView contentContainerStyle={[styles.container, { paddingTop: 100 }]}>
          <Text style={styles.title}>{prova?.descricao}</Text>

          <View style={styles.headerInfo}>
			<Text style={styles.headerInfoText}>Status: {status}</Text>
			<Text style={styles.headerInfoText}>
				Tempo da prova: {Number(prova?.tempoProva ?? 0)} min
			</Text>

			{result?.nota != null && (
				<Text style={styles.headerInfoText}>
				Nota: {Number(result.nota).toFixed(1)}
				</Text>
			)}

			{result?.tempoGasto != null && (
				<Text style={styles.headerInfoText}>
				Tempo gasto: {formatTime(result.tempoGasto)}
				</Text>
			)}
		  </View>

          {questoes.map((q, i) => {
            const correta = String(q.resposta ?? "").toUpperCase();

            return (
              <View key={i} style={styles.card}>
                <Text style={styles.qNumber}>
                  Questão {q.numeroQuestao ?? i + 1}
                </Text>

                <Text style={styles.qText}>{q.enunciado}</Text>

                {(q.alternativas ?? []).map((alt) => {
                  const letra = extractLetter(alt.alternativa);
                  const selected = isSelected(q, alt);

                  const showCorrect = finished && letra === correta;
                  const showWrong = finished && selected && letra !== correta;

                  return (
                    <TouchableOpacity
                      key={alt.id}
                      style={[
                        styles.option,
                        selected && !finished && styles.selected,
                        showCorrect && styles.correct,
                        showWrong && styles.wrong,
                      ]}
                      onPress={() => selectAlternative(q, alt)}
                      disabled={finished || remaining <= 0}
                    >
                      <Text style={styles.optionText}>{alt.alternativa}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}

          {finished && result && (
            <View style={styles.result}>
              <Text style={styles.resultTitle}>Resultado</Text>
              {result.nota != null && <Text>Nota: {Number(result.nota).toFixed(1)}</Text>}
              {result.acertos != null && <Text>Acertos: {result.acertos}</Text>}
              {result.erros != null && <Text>Erros: {result.erros}</Text>}
              {result.tempoGasto != null && (
                <Text>Tempo gasto: {formatTime(result.tempoGasto)}</Text>
              )}
              <Text>Status: {status}</Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnLight} onPress={() => router.back()}>
              <Text>Voltar</Text>
            </TouchableOpacity>

            {!finished && status !== "FINALIZADA" && status !== "EXPIRADA" && remaining > 0 && (
              <TouchableOpacity style={styles.btnPrimary} onPress={finalizeExam}>
                <Text style={{ color: "#fff" }}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },

  timer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111",
    padding: 12,
    zIndex: 10,
  },

  timerMain: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  timerSub: { color: "#aaa", fontSize: 12 },

  container: { padding: 16 },

  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },

  headerInfo: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    gap: 4,
  },

  headerInfoText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
  },

  qNumber: { fontWeight: "bold", marginBottom: 6 },
  qText: { marginBottom: 10 },

  option: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 6,
  },

  selected: { backgroundColor: "#ccc" },
  correct: { backgroundColor: "#c8f7c5" },
  wrong: { backgroundColor: "#f7c5c5" },

  optionText: {},

  result: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginTop: 12,
  },

  resultTitle: { fontWeight: "bold", marginBottom: 6 },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  btnPrimary: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  btnLight: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});