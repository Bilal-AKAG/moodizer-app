import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Profile(){
    return(
        <>
        <SafeAreaProvider>
                      <SafeAreaView>
                          <View>
                            <Text>Welcome to profile</Text>
                          </View>
                      </SafeAreaView>
                    </SafeAreaProvider>
        
        </>
    )
}