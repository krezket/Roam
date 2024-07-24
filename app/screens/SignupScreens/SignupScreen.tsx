import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text>SignupScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})