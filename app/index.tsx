import React, { useRef, useEffect } from "react";
import { PropsWithChildren } from "react";
import { Animated, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue, withTiming, withSequence, SharedValue } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { getRandomColor } from "@/scripts/getRandomColor";
import { useNavigation } from "@react-navigation/native";

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default function index() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  
  const leftColor = useSharedValue('red');
  const rightColor = useSharedValue('black');
  
  const colors = useDerivedValue(() => {
    return [leftColor.value, rightColor.value];
  }, []);
  
  useEffect(() => {
    const createContinuousTransition = (colorSharedValue: SharedValue<string>) => {
      const colorSequence = Array.from({ length: 150 }, getRandomColor);
      const colorAnimations = colorSequence.map(color =>
        withTiming(color, { duration: 4000 })
      );
      colorSharedValue.value = withSequence(...colorAnimations);
    };
    createContinuousTransition(leftColor);
    createContinuousTransition(rightColor);
  }, [leftColor, rightColor]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Canvas style={StyleSheet.absoluteFillObject}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
            />
        </Rect>
      </Canvas>

      <FadeInView style={styles.textContainer}>
        <Text>Welcome to</Text>
        <Image source={require('../assets/images/ROAM.png')} />
      </FadeInView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    fontFamily: 'times new roman',
    color: 'black',
    fontSize: 20,
  },
  buttonContainer: {  
    justifyContent: 'space-around',
    marginTop: 400,
    gap: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 90,
    paddingRight: 90,
  },
});
