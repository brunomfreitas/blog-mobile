import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
	<View
	  style={styles.container}
	>
	  {/* <Image source={require('../assets/images/logo_blog_2.png')} style={styles.imagem} /> */}
	  <Text>Home</Text>
	</View>
  );
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
		margin: 10,
	},
	imagem:{
		width: 140,
		height: 45
	}
})