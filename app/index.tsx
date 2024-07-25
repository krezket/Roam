import React, { useRef, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { Animated, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Platform, Button, Pressable } from "react-native";
import { ViewStyle } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia/src";
import { useDerivedValue, useSharedValue, withTiming, withSequence, SharedValue } from "react-native-reanimated";
import { getRandomColor } from "@/scripts/getRandomColor";
import { useNavigation } from "@react-navigation/native";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, WEB_CLIENT_ID } from '@env';
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
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState<null | { name: string }>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success" && response.authentication) {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

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
        <Image source={require('../assets/images/ROAM.png')} />
        <Text>{JSON.stringify(userInfo,null,2)}</Text>
      </FadeInView>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => promptAsync()}>
          <Text>Sign in with Google</Text>
        </Pressable>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen' as never)}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => AsyncStorage.removeItem('@user')}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>  
      </>
      :
      <>
      <View style={styles.textContainer}>
        <Text>Welcome back, {userInfo.name}!</Text>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>

        <TouchableOpacity style={styles.button} onPress={() => AsyncStorage.removeItem('@user')}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
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
