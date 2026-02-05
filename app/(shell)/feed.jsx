import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import BlogCard from "../../components/BlogCard";
import { getCategories } from "../../services/categoryService";
import { getPublicPosts, searchPublicPosts } from "../../services/postsService";

const LIMIT = 12;

export default function Feed() {
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null = todas
  const [categories, setCategories] = useState([]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState("");

  // debounce
  const debounceRef = useRef(null);

  // ===== 1) Carrega categorias =====
  useEffect(() => {
    (async () => {
      try {
        setLoadingCategories(true);
        const resp = await getCategories();		
        setCategories(Array.isArray(resp.data) ? resp.data : []);
      } catch (e) {
        console.error("❌ Erro ao carregar categorias:", e);
      } finally {
        setLoadingCategories(false);
      }
    })();
  }, []);

  // ===== 2) Funções de fetch =====
  const fetchPostsByCategory = async (catId) => {
    try {
      setLoading(true);
      setError("");

      const resp = await getPublicPosts(1, LIMIT, catId);
      setPosts(resp.data);
    } catch (e) {
      console.error("❌ Erro ao carregar posts:", e);
      setError("Não foi possível carregar os posts.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsBySearch = async (text) => {
    try {
      setLoading(true);
      setError("");

      const resp = await searchPublicPosts(text);
      setPosts(resp.data);
    } catch (e) {
      console.error("❌ Erro ao buscar posts:", e);
      setError("Não foi possível buscar os posts.");
    } finally {
      setLoading(false);
    }
  };

  // ===== 3) Quando muda categoria (e NÃO tem busca ativa), recarrega =====
  useEffect(() => {
    const text = (search ?? "").trim();
    if (text.length > 0) return; // se está buscando, não recarrega por categoria

    fetchPostsByCategory(selectedCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  // ===== 4) Busca com debounce (se tiver texto, ignora categoria) =====
  useEffect(() => {
    const text = (search ?? "").trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    // se limpou a busca, volta a listar pela categoria atual
    if (text.length === 0) {
      debounceRef.current = setTimeout(() => {
        fetchPostsByCategory(selectedCategoryId);
      }, 150);
      return;
    }

    debounceRef.current = setTimeout(() => {
      // ao buscar, segue a mesma lógica do web: "onChange(null)" => todas
      setSelectedCategoryId(null);
      fetchPostsBySearch(text);
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ===== 5) Helpers UI =====
  const categoryChips = useMemo(() => {
    const base = [{ id: null, name: "Todas categorias" }];
    const fromApi = categories.map((c) => ({ id: c.id, name: c.name }));
    return [...base, ...fromApi];
  }, [categories]);

  const onPressCategory = (catId) => {
    Keyboard.dismiss();
    setSearch(""); // opcional (no web você “zera” quando troca de categoria via onChange(null) no search; aqui inverti)
    setSelectedCategoryId(catId);
  };

  const goToPost = (id) => {
    if (!id) return;
    router.push(`/(shell)/post/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Top: Search + Novo */}
      <View style={styles.topRow}>
        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Buscar postagens..."
            value={search}
            onChangeText={setSearch}
            style={styles.search}
            returnKeyType="search"
            onSubmitEditing={() => {
              const text = (search ?? "").trim();
              if (text.length > 0) fetchPostsBySearch(text);
            }}
          />
        </View>
      </View>

      {/* Categorias (scroll horizontal) */}
      <View style={styles.categoriesWrap}>
        {loadingCategories ? (
          <View style={styles.categoriesLoading}>
            <ActivityIndicator />
            <Text style={styles.categoriesLoadingText}>Carregando categorias...</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categoryChips.map((cat) => {
              const active = selectedCategoryId === cat.id;
              return (
                <TouchableOpacity
                  key={String(cat.id)}
                  onPress={() => onPressCategory(cat.id)}
                  style={[
                    styles.categoryItem,
                    active && styles.categoryActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* Lista */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.centerText}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={[styles.centerText, { color: "red" }]}>{error}</Text>

          <TouchableOpacity
            style={[styles.newBtn, { marginTop: 12 }]}
            onPress={() => {
              const text = (search ?? "").trim();
              if (text.length > 0) fetchPostsBySearch(text);
              else fetchPostsByCategory(selectedCategoryId);
            }}
          >
            <Text style={styles.newBtnText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={Array.isArray(posts) ? posts : []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <BlogCard post={item} onPress={() => goToPost(item.id)} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  searchWrap: { flex: 1 },
  search: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    fontSize: 14,
  },

  newBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  newBtnText: { color: "#fff", fontWeight: "500" },

  categoriesWrap: { marginTop: 12 },
  categories: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 6,
  },
  categoriesLoading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoriesLoadingText: { color: "#555" },

  categoryItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  categoryActive: { backgroundColor: "#000" },
  categoryText: { fontSize: 13, color: "#333" },
  categoryTextActive: { color: "#fff", fontWeight: "600" },

  list: { padding: 16 },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 10,
  },
  centerText: { color: "#333" },
});
