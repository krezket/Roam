import { Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { getRandomColor } from "@/scripts/getRandomColor";

export default function index() {
  const { width, height } = useWindowDimensions();

  const leftColor = useSharedValue('red');
  const rightColor = useSharedValue('blue');

  const colors = useDerivedValue(() => {
    return [leftColor.value, rightColor.value];
  }, []);

  return (
    <>
      <StatusBar />
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          leftColor.value = withTiming(getRandomColor());
          rightColor.value = withTiming(getRandomColor());
        }}>
      </TouchableOpacity>    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
