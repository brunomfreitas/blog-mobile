import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BlogCard({ post, onPress }) {

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={post?.image ? post.image : require("../assets/imgs/sem_imagem.png")}
        style={styles.image}
        contentFit="cover"
        transition={150}
      />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>

        <Text style={styles.meta} numberOfLines={1}>
          {post.postedByPerson.name}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {post.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,

    // sombra (Android/iOS)
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#eee",
  },
  body: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  meta: {
    fontSize: 12,
    color: "#666",
  },
  description: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
});
