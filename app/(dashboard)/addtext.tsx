import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function Addtext(){
    return(
        <>
         <SafeAreaProvider>
              <SafeAreaView>
                  <View>
                    <Text>Welcome to AddText Constext</Text>
                  </View>
              </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}