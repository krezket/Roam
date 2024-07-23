import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { getRandomColor } from "@/scripts/getRandomColor";

export default function index() {
  const { width, height } = useWindowDimensions();

  const leftColor = useSharedValue('white');
  // const middleColor = useSharedValue('red');
  const rightColor = useSharedValue('black');

  const colors = useDerivedValue(() => {
    return [
      leftColor.value, 
      // middleColor.value, 
      rightColor.value
    ];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      leftColor.value = withTiming(getRandomColor());
      // middleColor.value = withTiming(getRandomColor());
      rightColor.value = withTiming(getRandomColor());
    }, 10); 

    return () => clearInterval(interval);
  }, [
    leftColor, 
    // middleColor, 
    rightColor]);

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
