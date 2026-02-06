import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { useAuth } from "../../../auth/AuthContext";
import { deletePost, getAdminPosts, searchPublicPosts } from "../../../services/postsService";

function normalizePost(p) {
// Ajuste aqui se o backend usa outros nomes
return {
	id: String(p?.id ?? ""),
	title: p?.title ?? "Sem título",
	subtitle: p?.subtitle ?? "",
	categoryName: p?.postCategory?.name ?? p?.categoryName ?? "Geral",
	statusName: p?.postStatus?.name ?? p?.statusName ?? "",
	postedAt: p?.postedAt ?? null,
	author: p?.postedByPerson?.name ?? p?.author?.name ?? "—",
};
}

export default function PostsManage() {

	const { token } = useAuth(); // 🔐  

	const [query, setQuery] = useState("");

	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState("");

	async function fetchPosts({ reset = false, nextPage = 1 } = {}) {
		try {
			if (reset) {
				setLoading(true);
				setError("");
				setHasMore(true);
			} else {
				setLoadingMore(true);
			}

			// Se tiver query, usa search; senão lista padrão
			const q = query.trim();
			let resp;

			if (q) {
				resp = await searchPublicPosts(q); // se seu backend retornar lista simples
			} else {
				resp = await getAdminPosts(token, nextPage, 12);
			}

			const data = resp?.data ?? [];
			const list = Array.isArray(data) ? data : (data?.items ?? []);

			// paginação:
			// - se searchPublicPosts não for paginado, tratamos como reset sempre
			const newItems = list.map(normalizePost);

			if (reset) {
				setPosts(newItems);
				setPage(nextPage);
			} else {
				setPosts((prev) => prev.concat(newItems));
				setPage(nextPage);
			}

			// Heurística: se vier menos que o limit, não tem mais
			// (se search não pagina, já encerramos)
			if (q) {
				setHasMore(false);
			} else {
				setHasMore(newItems.length >= 12);
			}
			} catch (e) {
				console.log("❌ Erro ao carregar posts:", e);
				setError("Não foi possível carregar as postagens.");
			if (reset) setPosts([]);
			} finally {
				setLoading(false);
				setLoadingMore(false);
		}
	}

	// Recarrega quando muda categoria (reset)
	useEffect(() => {
		fetchPosts({ reset: true, nextPage: 1 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function confirmDelete(item) {		
		// 🌐 WEB
		if (Platform.OS === "web") {
			const ok = window.confirm(
			`Tem certeza que deseja excluir:\n\n"${item.title}"?`
			);

			if (!ok) return;

			handleDelete(item);
			return;
		}

		// 📱 ANDROID / IOS
		Alert.alert(
			"Excluir postagem",
			`Tem certeza que deseja excluir:\n\n"${item.title}"?`,
			[
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Excluir",
				style: "destructive",
				onPress: () => handleDelete(item),
			},
			]
		);
	}


	async function handleDelete(item) {
		try {
			await deletePost(item.id);

			// remove da lista local
			setPosts((prev) => prev.filter((p) => p.id !== item.id));

			Alert.alert?.("Sucesso", "Postagem excluída!");
		} catch (e) {
			console.log("❌ Erro ao excluir:", e);
			Alert.alert?.("Erro", "Não foi possível excluir a postagem.");
		}
	}

	const renderItem = ({ item }) => {
		return (
		<View style={styles.card}>
			<View style={{ flex: 1, gap: 4 }}>
			<Text style={styles.badge}>{item.categoryName}</Text>
			<Text style={styles.title} numberOfLines={2}>{item.title}</Text>

			{item.subtitle ? (
				<Text style={styles.subtitle} numberOfLines={2}>
				{item.subtitle}
				</Text>
			) : null}

			<Text style={styles.meta} numberOfLines={1}>
				{item.author}{item.statusName ? ` • ${item.statusName}` : ""}
			</Text>
			</View>

			<View style={styles.actions}>
			<TouchableOpacity
				style={[styles.btn, styles.btnGhost]}
				onPress={() => router.push(`/(shell)/post/${item.id}`)}
			>
				<Text style={styles.btnGhostText}>Ver</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.btn, styles.btnGhost]}
				onPress={() => router.push(`/(private)/post/edit/${item.id}`)}
			>
				<Text style={styles.btnGhostText}>Editar</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.btn, styles.btnDanger]}
				onPress={() => confirmDelete(item)}
			>
				<Text style={styles.btnDangerText}>Excluir</Text>
			</TouchableOpacity>
			</View>
		</View>
		);
	};

	const empty = !loading && posts.length === 0;

	return (
		<View style={styles.container}>
		{/* Top bar */}
		<View style={styles.topRow}>
			<Text style={styles.pageTitle}>Gerenciar Postagens</Text>

			<TouchableOpacity
			style={styles.newBtn}
			onPress={() => router.push("/(private)/post/new")}
			>
			<Text style={styles.newBtnText}>+ Novo</Text>
			</TouchableOpacity>
		</View>

		{/* Content */}
		{loading ? (
			<View style={styles.center}>
			<ActivityIndicator />
			<Text style={{ marginTop: 10, color: "#666" }}>Carregando...</Text>
			</View>
		) : error ? (
			<View style={styles.center}>
			<Text style={{ color: "crimson", fontWeight: "700" }}>{error}</Text>
			<TouchableOpacity
				style={[styles.btn, styles.btnPrimary, { marginTop: 12 }]}
				onPress={() => fetchPosts({ reset: true, nextPage: 1 })}
			>
				<Text style={styles.btnPrimaryText}>Tentar novamente</Text>
			</TouchableOpacity>
			</View>
		) : empty ? (
			<View style={styles.center}>
			<Text style={{ color: "#666" }}>Nenhuma postagem encontrada.</Text>
			</View>
		) : (
			<FlatList
			data={posts}
			keyExtractor={(item) => item.id}
			renderItem={renderItem}
			contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 12 }}
			onEndReached={() => {
				if (!hasMore || loadingMore || query.trim()) return;
				fetchPosts({ reset: false, nextPage: page + 1 });
			}}
			onEndReachedThreshold={0.6}
			ListFooterComponent={
				loadingMore ? (
				<View style={{ paddingVertical: 14 }}>
					<ActivityIndicator />
				</View>
				) : null
			}
			showsVerticalScrollIndicator={false}
			/>
		)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	topRow: {
		paddingTop: 14,
		paddingHorizontal: 16,
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
	},
	pageTitle: { fontSize: 18, fontWeight: "900", color: "#111" },
	newBtn: {
		backgroundColor: "#000",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 10,
	},
	newBtnText: { color: "#fff", fontWeight: "800" },
	searchWrap: { paddingHorizontal: 16, paddingBottom: 10 },
	search: {
		backgroundColor: "#f1f1f1",
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 14,
	},
	chipsRow: { paddingVertical: 8 },
	chip: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: "#eee",
	},
	chipActive: { backgroundColor: "#000" },
	chipText: { fontSize: 13, color: "#333", fontWeight: "600" },
	chipTextActive: { color: "#fff" },
	center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
	card: {
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 14,
		padding: 14,
		backgroundColor: "#fff",
		gap: 10,
	},
	badge: {
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 999,
		backgroundColor: "#f1f1f1",
		color: "#333",
		fontSize: 12,
		fontWeight: "700",
	},
	title: { fontSize: 16, fontWeight: "900", color: "#111" },
	subtitle: { fontSize: 13, color: "#333" },
	meta: { fontSize: 12, color: "#666" },
	actions: { flexDirection: "row", gap: 8, justifyContent: "flex-end" },
	btn: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	btnGhost: { backgroundColor: "#f1f1f1" },
	btnGhostText: { color: "#111", fontWeight: "800", fontSize: 12 },
	btnDanger: { backgroundColor: "#111" },
	btnDangerText: { color: "#fff", fontWeight: "900", fontSize: 12 },
	btnPrimary: { backgroundColor: "#000" },
	btnPrimaryText: { color: "#fff", fontWeight: "900" },
});
