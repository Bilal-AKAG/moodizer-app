import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { TouchableOpacity,Text, TouchableOpacityProps,StyleSheet } from "react-native";

type buttonprops={
title:string,
}& TouchableOpacityProps

export default function Custumbutton({title,...props}:buttonprops){
    return(
        <>
        <TouchableOpacity {...props} >
            <Text style={styles.loginButtonText} >{title}</Text>
            <AntDesign name="arrowright" size={20} color="white" />
        </TouchableOpacity>
        </>
    )
  
    
}
const styles = StyleSheet.create({
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        marginRight: 10,
      },
})