// import { Stack, router } from "expo-router";
// import { useState } from "react";
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function NewPost() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");

//   function save() {
//     if (!title || !author || !category) {
//       Alert.alert("Atenção", "Preencha Título, Autor e Categoria.");
//       return;
//     }

//     // Depois aqui você chama API (POST /posts)
//     console.log({ title, author, category, description, content });

//     Alert.alert("Sucesso", "Post cadastrado! (simulação)");
//     router.back();
//   }

//   return (
//     <>
//       <Stack.Screen options={{ title: "Novo Post" }} />

//       <View style={styles.container}>
//         <Text style={styles.label}>Título</Text>
//         <TextInput style={styles.input} value={title} onChangeText={setTitle} />

//         <Text style={styles.label}>Autor</Text>
//         <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

//         <Text style={styles.label}>Categoria</Text>
//         <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Ex: Mobile" />

//         <Text style={styles.label}>Descrição breve</Text>
//         <TextInput style={styles.input} value={description} onChangeText={setDescription} />

//         <Text style={styles.label}>Conteúdo</Text>
//         <TextInput
//           style={[styles.input, styles.textarea]}
//           value={content}
//           onChangeText={setContent}
//           multiline
//         />

//         <TouchableOpacity style={styles.btn} onPress={save}>
//           <Text style={styles.btnText}>Salvar</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, gap: 10 },
//   label: { fontSize: 12, color: "#666", fontWeight: "600" },
//   input: { backgroundColor: "#f1f1f1", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
//   textarea: { minHeight: 140, textAlignVertical: "top" },
//   btn: { marginTop: 8, backgroundColor: "#000", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
//   btnText: { color: "#fff", fontWeight: "800" },
// });


import PostForm from "../../(shell)/post/_form";

export default function NewPost() {
  return (
    <PostForm />
  );
}
