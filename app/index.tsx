import React, { useRef, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { Animated, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Platform, Button, Pressable } from "react-native";
import { ViewStyle } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia/src";
import { useDerivedValue, useSharedValue, withTiming, withSequence, SharedValue } from "react-native-reanimated";
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

export default function InitialScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<null | { name: string }>(null);

  const { width, height } = useWindowDimensions();
  const leftColor = useSharedValue('red');
  const rightColor = useSharedValue('black');
  
  const colors = useDerivedValue(() => {
    return [leftColor.value, rightColor.value];
  }, []);

  
  useEffect(() => {
    const createContinuousTransition = (colorSharedValue: SharedValue<string>) => {
    const colorSequence = Array.from({ length: 250 }, getRandomColor);
    const colorAnimations = colorSequence.map(color =>
        withTiming(color, { duration: 4000 })
      );
      colorSharedValue.value = withSequence(...colorAnimations);
    };
    createContinuousTransition(leftColor);
    // createContinuousTransition(rightColor);
  }, [leftColor, rightColor]);

  return (
    <View style={styles.container}>
      {!userInfo ? 
      <>
      {Platform.OS !== 'web' && (
        <Canvas style={StyleSheet.absoluteFillObject}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={colors}
            />
          </Rect>
        </Canvas>
      )}

      <FadeInView style={styles.textContainer}>
        <Text>Welcome to</Text>
        <Image source={require('../assets/images/ROAM.png')} style={styles.image} />
        <Text>{JSON.stringify(userInfo,null,2)}</Text>
      </FadeInView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('SignupScreen' as never)}>
          <Text style={styles.text}>Sign up with email</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('LoginScreen' as never)}>
          <Text style={styles.text}>Log In</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('GoogleAuth' as never)}>
          <Text style={styles.text}>Go to Practice Screen</Text>
        </Pressable>
      </View>  
      </>
      :
      <>
      <View style={styles.textContainer}>
        <Text>Welcome back, {userInfo.name}!</Text>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      </View>
      </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {  
    justifyContent: 'space-around',
    marginTop: 400,
    gap: 30,
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderRadius: 2,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 90,
    paddingRight: 90,
  },
});
