import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerTwo}>
        <Text>Email address</Text>
        <TextInput placeholder="Email" style={styles.TextInput} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  TextInput: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
})