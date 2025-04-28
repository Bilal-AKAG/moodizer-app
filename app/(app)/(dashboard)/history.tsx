import React from "react"
import { View,Text } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function History(){
    return(
        <>
        <SafeAreaProvider>
              <SafeAreaView>
                  <View>
                    <Text>Welcome to History dashboard</Text>
                  </View>
              </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}``