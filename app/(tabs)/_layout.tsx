import { Tabs } from 'expo-router';
import React from 'react'

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{title: "Home"}}/>
    </Tabs>
  )
}