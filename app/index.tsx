import React, { useRef, useEffect } from "react";
import { PropsWithChildren } from "react";
import { Animated, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Platform, Button } from "react-native";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia/src";
import { useDerivedValue, useSharedValue, withTiming, withSequence, SharedValue } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { getRandomColor } from "@/scripts/getRandomColor";
import { useNavigation } from "@react-navigation/native";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

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

  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "784595666289-j393omat5dag5d2oheodgp68pq13vb95.apps.googleusercontent.com",
    iosClientId: "784595666289-ke8u41q9v0e80gevc34ms42281ga3fr1.apps.googleusercontent.com",
    webClientId: "784595666289-5uh2750gd6t95nin7utvkpc8igu2k475.apps.googleusercontent.com"
  });

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
    createContinuousTransition(rightColor);
  }, [leftColor, rightColor]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

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
        <Image source={require('../assets/images/ROAM.png')} />
      </FadeInView>

      <View style={styles.buttonContainer}>
        <Button title="Sign in with Google" onPress={(event) => promptAsync()}/>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen' as never)}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupScreen' as never)}>
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
