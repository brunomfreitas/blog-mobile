// import { Stack, router, useLocalSearchParams } from "expo-router";
// import { useEffect, useMemo, useRef, useState } from "react";
// import {
// 	ActivityIndicator,
// 	Alert,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import { getProvaById } from "../../../services/provaService";

// function formatElapsed(seconds) {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   const pad = (n) => String(n).padStart(2, "0");
//   return hrs > 0 ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;
// }

// function extractLetter(text = "") {
//   const match = String(text).match(/\(([A-E])\)/i);
//   return match?.[1]?.toUpperCase() ?? null;
// }



// export default function ProvaRenderer({ mode = "teacher_view" }) {
//   const { id } = useLocalSearchParams();
//   const isTeacherView = mode === "teacher_view";
//   const isStudentExam = mode === "student_exam";

//   const [loading, setLoading] = useState(true);
//   const [prova, setProva] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [finished, setFinished] = useState(false);
		
// 	const [startedAt, setStartedAt] = useState(null);	
// 	const [remainingSeconds, setRemainingSeconds] = useState(0);

//   const timerRef = useRef(null);

// 	useEffect(() => {
// 		if (!prova || !isStudentExam) return;

// 		const tempoMin = Number(prova?.tempoProva ?? 0);
// 		setStartedAt(Date.now());
// 		setElapsedSeconds(0);
// 		setRemainingSeconds(tempoMin * 60);
// 	}, [prova, isStudentExam]);

// 	useEffect(() => {
// 		if (!isStudentExam || loading || finished || remainingSeconds <= 0) return;

// 		timerRef.current = setInterval(() => {
// 			setElapsedSeconds((prev) => prev + 1);
// 			setRemainingSeconds((prev) => {
// 			if (prev <= 1) {
// 				clearInterval(timerRef.current);
// 				handleAutoFinish();
// 				return 0;
// 			}
// 			return prev - 1;
// 			});
// 		}, 1000);

// 		return () => {
// 			if (timerRef.current) clearInterval(timerRef.current);
// 		};
// 		}, [isStudentExam, loading, finished, remainingSeconds]);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const resp = await getProvaById(String(id));
//         const data = resp?.data ?? resp;
//         setProva(data);
//       } catch (e) {
//         console.log("❌ Erro ao carregar prova:", e);
//         Alert.alert("Erro", "Não foi possível carregar a prova.");
//         router.back();
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   useEffect(() => {
//     if (!isStudentExam || loading || finished) return;

//     timerRef.current = setInterval(() => {
//       setElapsedSeconds((prev) => prev + 1);
//     }, 1000);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isStudentExam, loading, finished]);

//   const questoes = useMemo(() => {
//     return Array.isArray(prova?.questoes) ? prova.questoes : [];
//   }, [prova]);

//   function selectAlternative(questaoId, alternativa) {
//     if (!isStudentExam || finished) return;

//     setAnswers((prev) => ({
//       ...prev,
//       [questaoId]: alternativa,
//     }));
//   }

//   	function extractLetter(text = "") {
// 		const match = String(text).match(/\(([A-E])\)/i);
// 		return match?.[1]?.toUpperCase() ?? null;
// 	}

// 	function calculateResult() {
// 		let acertos = 0;
// 		const total = questoes.length;

// 		for (const q of questoes) {
// 			const marked = extractLetter(answers[q.questaoId]?.alternativa);
// 			const correct = String(q.resposta ?? "").toUpperCase();

// 			if (marked && marked === correct) acertos++;
// 		}

// 		const nota = total > 0 ? (acertos / total) * 10 : 0;

// 		return {
// 			total,
// 			acertos,
// 			erros: total - acertos,
// 			nota,
// 		};
// 	}

// 	function selectAlternative(questaoId, alternativa) {
// 		if (!isStudentExam || finished || remainingSeconds <= 0) return;

// 		setAnswers((prev) => ({
// 			...prev,
// 			[questaoId]: alternativa,
// 		}));
// 		}

//   	function handleAutoFinish() {
// 		finalizeExamInternal("timeout");
// 	}

// function finalizeExam() {
//   if (!isStudentExam || finished) return;

//   Alert.alert(
//     "Finalizar prova",
//     "Depois de finalizar, você não poderá mais alterar suas respostas. Deseja continuar?",
//     [
//       { text: "Cancelar", style: "cancel" },
//       { text: "Finalizar", onPress: () => finalizeExamInternal("manual") }
//     ]
//   );
// }

//   function finalizeExamInternal(reason = "manual") {
//   if (finished) return;

//   setFinished(true);

//   if (timerRef.current) {
//     clearInterval(timerRef.current);
//   }

//   const result = calculateResult();

//   Alert.alert(
//     reason === "timeout" ? "Tempo encerrado" : "Prova finalizada",
//     `Sua nota foi ${result.nota.toFixed(1)}.\nAcertos: ${result.acertos}/${result.total}`
//   );
// }

// //   const result = useMemo(() => {
// //     if (!finished || !isStudentExam) return null;

// //     let acertos = 0;

// //     for (const q of questoes) {
// //       const marked = extractLetter(answers[q.questaoId]?.alternativa);
// //       const correct = String(q.resposta ?? "").toUpperCase();

// //       if (marked && marked === correct) acertos++;
// //     }

// //     return {
// //       total: questoes.length,
// //       acertos,
// //       erros: questoes.length - acertos,
// //     };
// //   }, [answers, finished, isStudentExam, questoes]);

// 	const result = useMemo(() => {
// 		if (!finished || !isStudentExam) return null;
// 		return calculateResult();
// 	}, [finished, isStudentExam, answers, questoes]);

//   if (loading) {
//     return (
//       <>
//         <Stack.Screen
//           options={{
//             title: isTeacherView ? "Visualizar Prova" : "Responder Prova",
//           }}
//         />
//         <View style={styles.center}>
//           <ActivityIndicator size="large" />
//           <Text style={styles.centerText}>Carregando prova...</Text>
//         </View>
//       </>
//     );
//   }

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: isTeacherView ? "Visualizar Prova" : "Responder Prova",
//         }}
//       />

	
//     <View style={styles.screen}>
// 		{isStudentExam && (
// 			<View style={styles.timerBar}>
// 				<View>
// 					<Text style={styles.timerLabel}>Tempo decorrido</Text>
// 					<Text style={styles.timerSmall}>{formatElapsed(elapsedSeconds)}</Text>
// 				</View>

// 				<View style={{ alignItems: "flex-end" }}>
// 					<Text style={styles.timerLabel}>Tempo restante</Text>
// 					<Text style={styles.timerValue}>{formatElapsed(remainingSeconds)}</Text>
// 				</View>
// 			</View>
// 	  	)}

//         <ScrollView
// 			contentContainerStyle={[
// 				styles.container,
// 				isStudentExam && { paddingTop: 86 }
// 			]}
// 			showsVerticalScrollIndicator={false}
// 			>
//           <Text style={styles.title}>{prova?.descricao ?? "Prova"}</Text>
//           <Text style={styles.subtitle}>
//             {isTeacherView
//               ? "Visualização da prova com gabarito."
//               : finished
//               ? "Prova finalizada."
//               : "Selecione uma alternativa para cada questão."}
//           </Text>

//           {questoes.map((questao, index) => {
//             const selected = answers[questao.questaoId];
//             const correctLetter = String(questao?.resposta ?? "").toUpperCase();

//             return (
//               <View key={`${questao.questaoId}-${index}`} style={styles.questionCard}>
//                 <Text style={styles.questionNumber}>Questão {questao.numeroQuestao ?? index + 1}</Text>
//                 <Text style={styles.questionText}>{questao.enunciado}</Text>

//                 <View style={styles.options}>
//                   {(questao.alternativas ?? []).map((alt) => {
//                     const altLetter = extractLetter(alt.alternativa);
//                     const isSelected = selected?.id === alt.id;
//                     const isCorrect = altLetter === correctLetter;

//                     const showTeacherCorrect = isTeacherView && isCorrect;
//                     const showStudentReview = finished && isStudentExam;
//                     const showStudentCorrect = showStudentReview && isCorrect;
//                     const showStudentWrong = showStudentReview && isSelected && !isCorrect;

//                     return (
//                       <TouchableOpacity
//                         key={alt.id}
//                         style={[
//                           styles.option,
//                           isSelected && !finished && styles.optionSelected,
//                           showTeacherCorrect && styles.optionCorrect,
//                           showStudentCorrect && styles.optionCorrect,
//                           showStudentWrong && styles.optionWrong,
//                         ]}
//                         onPress={() => selectAlternative(questao.questaoId, alt)}
//                         disabled={!isStudentExam || finished || remainingSeconds <= 0}
//                         activeOpacity={0.8}
//                       >
//                         <Text
//                           style={[
//                             styles.optionText,
//                             (showTeacherCorrect || showStudentCorrect) && styles.optionTextStrong,
//                             showStudentWrong && styles.optionTextStrong,
//                           ]}
//                         >
//                           {alt.alternativa}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </View>

//                 {isTeacherView && (
//                   <View style={styles.answerBox}>
//                     <Text style={styles.answerLabel}>Resposta correta:</Text>
//                     <Text style={styles.answerValue}>{correctLetter}</Text>
//                   </View>
//                 )}
//               </View>
//             );
//           })}

//           {isTeacherView && (
//             <View style={styles.gabaritoCard}>
//               <Text style={styles.gabaritoTitle}>Gabarito</Text>
//               <View style={styles.gabaritoList}>
//                 {questoes.map((q, index) => (
//                   <View key={`g-${q.questaoId}-${index}`} style={styles.gabaritoItem}>
//                     <Text style={styles.gabaritoText}>
//                       {q.numeroQuestao ?? index + 1} {String(q.resposta ?? "").toUpperCase()}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           )}

//           {isStudentExam && finished && result && (
// 			<View style={styles.resultCard}>
// 				<Text style={styles.resultTitle}>Resultado</Text>
// 				<Text style={styles.resultText}>Nota: {result.nota.toFixed(1)}</Text>
// 				<Text style={styles.resultText}>Acertos: {result.acertos}</Text>
// 				<Text style={styles.resultText}>Erros: {result.erros}</Text>
// 				<Text style={styles.resultText}>Total: {result.total}</Text>
// 				<Text style={styles.resultText}>Tempo decorrido: {formatElapsed(elapsedSeconds)}</Text>
// 			</View>
// 			)}

//           <View style={styles.actionsRow}>
//             <TouchableOpacity style={[styles.btn, styles.btnLight]} onPress={() => router.back()}>
//               <Text style={[styles.btnText, styles.btnLightText]}>Voltar</Text>
//             </TouchableOpacity>

//             {isStudentExam && !finished && remainingSeconds > 0 && (
// 				<TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={finalizeExam}>
// 					<Text style={[styles.btnText, styles.btnPrimaryText]}>Finalizar prova</Text>
// 				</TouchableOpacity>
// 			)}
//           </View>
//         </ScrollView>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   timerBar: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     left: 0,
//     zIndex: 20,
//     backgroundColor: "#111",
//     paddingTop: 12,
//     paddingBottom: 12,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   timerLabel: {
//     color: "#ddd",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   timerValue: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 10,
//   },
//   centerText: {
//     color: "#333",
//   },

//   container: {
//     padding: 16,
//     gap: 14,
//     paddingTop: 16,
//     paddingBottom: 32,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: "#111",
//     marginTop: 4,
//   },
//   subtitle: {
//     fontSize: 13,
//     color: "#666",
//     marginBottom: 4,
//   },

//   questionCard: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ececec",
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//   },
//   questionNumber: {
//     fontSize: 13,
//     fontWeight: "800",
//     color: "#666",
//   },
//   questionText: {
//     fontSize: 16,
//     lineHeight: 23,
//     color: "#111",
//     fontWeight: "700",
//   },

//   options: {
//     gap: 10,
//   },
//   option: {
//     backgroundColor: "#f3f3f3",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: "#f3f3f3",
//   },
//   optionSelected: {
//     borderColor: "#111",
//     backgroundColor: "#ececec",
//   },
//   optionCorrect: {
//     backgroundColor: "#e7f8ec",
//     borderColor: "#84d19b",
//   },
//   optionWrong: {
//     backgroundColor: "#fdeaea",
//     borderColor: "#ef9a9a",
//   },
//   optionText: {
//     color: "#222",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   optionTextStrong: {
//     fontWeight: "800",
//   },

//   answerBox: {
//     marginTop: 2,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     padding: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   answerLabel: {
//     color: "#444",
//     fontWeight: "700",
//   },
//   answerValue: {
//     color: "#111",
//     fontWeight: "900",
//   },

//   gabaritoCard: {
//     backgroundColor: "#fafafa",
//     borderWidth: 1,
//     borderColor: "#ececec",
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//   },
//   gabaritoTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#111",
//   },
//   gabaritoList: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   gabaritoItem: {
//     backgroundColor: "#eee",
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   gabaritoText: {
//     fontSize: 13,
//     fontWeight: "800",
//     color: "#222",
//   },

//   resultCard: {
//     backgroundColor: "#f8f8f8",
//     borderRadius: 14,
//     padding: 14,
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#ececec",
//   },
//   resultTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#111",
//   },
//   resultText: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "600",
//   },

//   actionsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 4,
//   },
//   btn: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   btnText: {
//     fontWeight: "900",
//   },
//   btnLight: {
//     backgroundColor: "#eee",
//   },
//   btnLightText: {
//     color: "#111",
//   },
//   btnPrimary: {
//     backgroundColor: "#000",
//   },
//   btnPrimaryText: {
//     color: "#fff",
//   },
// });


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
import { getProvaById } from "../../../services/provaService";

function formatElapsed(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n) => String(n).padStart(2, "0");
  return hrs > 0 ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;
}

function extractLetter(text = "") {
  const match = String(text).match(/\(([A-E])\)/i);
  return match?.[1]?.toUpperCase() ?? null;
}

export default function ProvaRenderer({ mode = "teacher_view" }) {
  const { id } = useLocalSearchParams();
  const isTeacherView = mode === "teacher_view";
  const isStudentExam = mode === "student_exam";

  const [loading, setLoading] = useState(true);
  const [prova, setProva] = useState(null);
  const [answers, setAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);
  const autoFinishedRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await getProvaById(String(id));
        const data = resp?.data ?? resp;
        setProva(data);

        if (mode === "student_exam") {
          const tempoMin = Number(data?.tempoProva ?? 0);
          setElapsedSeconds(0);
          setRemainingSeconds(tempoMin * 60);
        }
      } catch (e) {
        console.log("❌ Erro ao carregar prova:", e);
        Alert.alert("Erro", "Não foi possível carregar a prova.");
        router.back();
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [id, mode]);

  useEffect(() => {
    if (!isStudentExam || loading || finished) return;
    if (remainingSeconds <= 0) return;

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => {
        const next = prev - 1;

        if (next <= 0 && !autoFinishedRef.current) {
          autoFinishedRef.current = true;
          setTimeout(() => finalizeExamInternal("timeout"), 0);
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStudentExam, loading, finished, remainingSeconds]);

  const questoes = useMemo(() => {
    return Array.isArray(prova?.questoes) ? prova.questoes : [];
  }, [prova]);

  function selectAlternative(questaoId, alternativa) {
    if (!isStudentExam || finished || remainingSeconds <= 0) return;

    setAnswers((prev) => ({
      ...prev,
      [questaoId]: alternativa,
    }));
  }

  function calculateResult() {
    let acertos = 0;
    const total = questoes.length;

    for (const q of questoes) {
      const marked = extractLetter(answers[q.questaoId]?.alternativa);
      const correct = String(q.resposta ?? "").toUpperCase();

      if (marked && marked === correct) acertos++;
    }

    return {
      total,
      acertos,
      erros: total - acertos,
      nota: total > 0 ? (acertos / total) * 10 : 0,
    };
  }

  function finalizeExam() {
    if (!isStudentExam || finished) return;

    if (Platform.OS === "web") {
      const ok = window.confirm(
        "Depois de finalizar, você não poderá mais alterar suas respostas. Deseja continuar?"
      );
      if (!ok) return;

      finalizeExamInternal("manual");
      return;
    }

    Alert.alert(
      "Finalizar prova",
      "Depois de finalizar, você não poderá mais alterar suas respostas. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Finalizar", onPress: () => finalizeExamInternal("manual") },
      ]
    );
  }

  function finalizeExamInternal(reason = "manual") {
    if (finished) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setFinished(true);

    const result = calculateResult();

    Alert.alert(
      reason === "timeout" ? "Tempo encerrado" : "Prova finalizada",
      `Sua nota foi ${result.nota.toFixed(1)}.\nAcertos: ${result.acertos}/${result.total}`
    );
  }

  const result = useMemo(() => {
    if (!finished || !isStudentExam) return null;
    return calculateResult();
  }, [finished, isStudentExam, answers, questoes]);

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: isTeacherView ? "Visualizar Prova" : "Responder Prova",
          }}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando prova...</Text>
        </View>
      </>
    );
  }

	console.log("mode", mode);
	console.log("isStudentExam", isStudentExam);
	console.log("remainingSeconds", remainingSeconds);
	console.log("finished", finished);

  return (
    <>
      <Stack.Screen
        options={{
          title: isTeacherView ? "Visualizar Prova" : "Responder Prova",
        }}
      />

      <View style={styles.screen}>
        {isStudentExam && (
          <View style={styles.timerBar}>
            <View>
              <Text style={styles.timerLabel}>Tempo decorrido</Text>
              <Text style={styles.timerSmall}>{formatElapsed(elapsedSeconds)}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.timerLabel}>Tempo restante</Text>
              <Text style={styles.timerValue}>{formatElapsed(remainingSeconds)}</Text>
            </View>
          </View>
        )}

        <ScrollView
          contentContainerStyle={[
            styles.container,
            isStudentExam && { paddingTop: 86 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{prova?.descricao ?? "Prova"}</Text>

          {questoes.map((questao, index) => {
            const selected = answers[questao.questaoId];
            const correctLetter = String(questao?.resposta ?? "").toUpperCase();

            return (
              <View key={`${questao.questaoId}-${index}`} style={styles.questionCard}>
                <Text style={styles.questionNumber}>
                  Questão {questao.numeroQuestao ?? index + 1}
                </Text>

                <Text style={styles.questionText}>{questao.enunciado}</Text>

                <View style={styles.options}>
                  {(questao.alternativas ?? []).map((alt) => {
                    const altLetter = extractLetter(alt.alternativa);
                    const isSelected = selected?.id === alt.id;
                    const isCorrect = altLetter === correctLetter;

                    const showTeacherCorrect = isTeacherView && isCorrect;
                    const showStudentReview = finished && isStudentExam;
                    const showStudentCorrect = showStudentReview && isCorrect;
                    const showStudentWrong = showStudentReview && isSelected && !isCorrect;

                    return (
                      <TouchableOpacity
                        key={alt.id}
                        style={[
                          styles.option,
                          isSelected && !finished && styles.optionSelected,
                          showTeacherCorrect && styles.optionCorrect,
                          showStudentCorrect && styles.optionCorrect,
                          showStudentWrong && styles.optionWrong,
                        ]}
                        onPress={() => selectAlternative(questao.questaoId, alt)}
                        disabled={!isStudentExam || finished || remainingSeconds <= 0}
                      >
                        <Text style={styles.optionText}>{alt.alternativa}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}

          {isStudentExam && finished && result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Resultado</Text>
              <Text style={styles.resultText}>Nota: {result.nota.toFixed(1)}</Text>
              <Text style={styles.resultText}>Acertos: {result.acertos}</Text>
              <Text style={styles.resultText}>Erros: {result.erros}</Text>
              <Text style={styles.resultText}>Total: {result.total}</Text>
            </View>
          )}

          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.btn, styles.btnLight]} onPress={() => router.back()}>
              <Text style={[styles.btnText, styles.btnLightText]}>Voltar</Text>
            </TouchableOpacity>

            {isStudentExam && !finished && remainingSeconds > 0 && (
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => {
					console.log("cliquei em finalizar");
					finalizeExam();
				}}>
                <Text style={[styles.btnText, styles.btnPrimaryText]}>Finalizar prova</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  timerBar: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 20,
    backgroundColor: "#111",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerLabel: {
    color: "#ddd",
    fontSize: 13,
    fontWeight: "600",
  },
  timerValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 10,
  },
  centerText: {
    color: "#333",
  },

  container: {
    padding: 16,
    gap: 14,
    paddingTop: 16,
    paddingBottom: 32,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },

  questionCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  questionNumber: {
    fontSize: 13,
    fontWeight: "800",
    color: "#666",
  },
  questionText: {
    fontSize: 16,
    lineHeight: 23,
    color: "#111",
    fontWeight: "700",
  },

  options: {
    gap: 10,
  },
  option: {
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
  optionSelected: {
    borderColor: "#111",
    backgroundColor: "#ececec",
  },
  optionCorrect: {
    backgroundColor: "#e7f8ec",
    borderColor: "#84d19b",
  },
  optionWrong: {
    backgroundColor: "#fdeaea",
    borderColor: "#ef9a9a",
  },
  optionText: {
    color: "#222",
    fontSize: 14,
    lineHeight: 20,
  },
  optionTextStrong: {
    fontWeight: "800",
  },

  answerBox: {
    marginTop: 2,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerLabel: {
    color: "#444",
    fontWeight: "700",
  },
  answerValue: {
    color: "#111",
    fontWeight: "900",
  },

  gabaritoCard: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  gabaritoTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
  },
  gabaritoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  gabaritoItem: {
    backgroundColor: "#eee",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  gabaritoText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#222",
  },

  resultCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 14,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
  },
  resultText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "900",
  },
  btnLight: {
    backgroundColor: "#eee",
  },
  btnLightText: {
    color: "#111",
  },
  btnPrimary: {
    backgroundColor: "#000",
  },
  btnPrimaryText: {
    color: "#fff",
  },
});

