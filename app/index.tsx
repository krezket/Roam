import { Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function index() {
  return (
    <LinearGradient
      style={styles.container}
      colors={['gray', 'red', 'gray']}>
      <Text>Welcome to</Text>
      <Image source={require("../assets/images/ROAM.png")} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
