// import { Stack, router, useLocalSearchParams } from "expo-router";
// import { useEffect, useMemo, useState } from "react";
// import {
// 	Alert,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// // MOCK por enquanto (depois troca por API)
// export const CATEGORIES = ["Todas", "Tech", "Mobile", "IA", "Design"];

// export const POSTS = [
//   {
//     id: "1",
//     image: require("../../../../assets/imgs/argon-logo.png"),
//     title: "Primeiro app com Expo",
//     author: "Bruno Freitas",
//     description: "Guia prático para iniciar no Expo Router.",
//     category: "Mobile",
//     content:
//       "Texto completo do post 1...\n\nParágrafo 2...\n\nParágrafo 3...",
//   },
//   {
//     id: "2",
//     image: require("../../../../assets/imgs/android.png"),
//     title: "IA no dia a dia",
//     author: "Bruno Freitas",
//     description: "Como usar IA para aumentar produtividade.",
//     category: "IA",
//     content: "Texto completo do post 2...\n\nMais conteúdo...",
//   },
// ];


// export default function EditPost() {
//   const { id } = useLocalSearchParams();

//   // pega o post do mock
//   const post = useMemo(() => {
//     return POSTS.find((p) => p.id === String(id));
//   }, [id]);

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   // carrega os dados no formulário
//   useEffect(() => {
//     if (!post) return;
//     setTitle(post.title ?? "");
//     setAuthor(post.author ?? "");
//     setCategory(post.category ?? "");
//     setDescription(post.description ?? "");
//     setContent(post.content ?? "");
//   }, [post]);

//   async function handleSave() {
//     if (!title || !author || !category) {
//       Alert.alert("Atenção", "Preencha Título, Autor e Categoria.");
//       return;
//     }

//     const payload = {
//       title,
//       author,
//       category,
//       description,
//       content,
//     };

//     try {
//       setLoading(true);

//       // ✅ AQUI é onde você vai chamar seu backend:
//       // await updatePost(String(id), payload);

//       console.log("EDIT payload", { id, payload });

//       Alert.alert("Sucesso", "Post atualizado!");
//       router.replace(`/(shell)/post/${id}`); // volta pro detalhe já atualizado
//     } catch (err) {
//       Alert.alert("Erro", "Não foi possível salvar.");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (!post) {
//     return (
//       <View style={styles.center}>
//         <Text>Post não encontrado.</Text>
//       </View>
//     );
//   }

//   return (
//     <>
//       <Stack.Screen options={{ title: "Editar Post" }} />

//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.label}>Título</Text>
//         <TextInput style={styles.input} value={title} onChangeText={setTitle} />

//         <Text style={styles.label}>Autor</Text>
//         <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

//         <Text style={styles.label}>Categoria</Text>
//         <View style={styles.categories}>
//           {CATEGORIES.filter((c) => c !== "Todas").map((cat) => (
//             <TouchableOpacity
//               key={cat}
//               onPress={() => setCategory(cat)}
//               style={[styles.categoryItem, category === cat && styles.categoryActive]}
//             >
//               <Text
//                 style={[
//                   styles.categoryText,
//                   category === cat && styles.categoryTextActive,
//                 ]}
//               >
//                 {cat}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Descrição breve</Text>
//         <TextInput
//           style={styles.input}
//           value={description}
//           onChangeText={setDescription}
//         />

//         <Text style={styles.label}>Conteúdo</Text>
//         <TextInput
//           style={[styles.input, styles.textarea]}
//           value={content}
//           onChangeText={setContent}
//           multiline
//         />

//         <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={loading}>
//           <Text style={styles.btnText}>{loading ? "Salvando..." : "Salvar"}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   center: { flex: 1, alignItems: "center", justifyContent: "center" },

//   container: { padding: 16, gap: 10 },
//   label: { fontSize: 12, color: "#666", fontWeight: "600" },
//   input: {
//     backgroundColor: "#f1f1f1",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   textarea: { minHeight: 160, textAlignVertical: "top" },

//   categories: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
//   categoryItem: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#eee",
//   },
//   categoryActive: { backgroundColor: "#000" },
//   categoryText: { fontSize: 13, color: "#333" },
//   categoryTextActive: { color: "#fff", fontWeight: "600" },

//   btn: {
//     marginTop: 8,
//     backgroundColor: "#000",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   btnText: { color: "#fff", fontWeight: "800" },
// });

import PostForm from "../../../(shell)/post/_form";

export default function EditPost() {
  return (	
		<PostForm />
  );
}
