import React, { useEffect, useState } from "react";
import {Text} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function SearchScreen() {
  
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-100 p-3">
        <Text>Seacrh Screen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
