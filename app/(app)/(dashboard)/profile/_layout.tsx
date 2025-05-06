import { Stack } from "expo-router";
import React from "react";
export default function ProfileLayout(){
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name='favourite' options={{headerShown:false}}/>
        </Stack>
    )
}