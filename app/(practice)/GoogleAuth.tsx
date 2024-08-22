import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from 'react-native'

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, WEB_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();


export default function GoogleAuth() {
  const navigation = useNavigation();

  const config = {
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  }
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState<null | { name: string }>(null);

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success" && response.authentication) {
        setToken(response.authentication.accessToken);
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

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <View style={styles.textContainer}>
          <Pressable style={styles.button} onPress={() => promptAsync()}>
            <Text style={styles.text}>Log in</Text>
          </Pressable>
          <Text>Not logged in</Text>
        </View>
      ) : (
        <View>
          <Text>{JSON.stringify(userInfo, null, 2)}</Text>
          <Pressable style={styles.button} onPress={() => AsyncStorage.removeItem('@user')}>
            <Text style={styles.text}>Log Out</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: "white",
  },
});