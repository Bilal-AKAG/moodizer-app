import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from "react-native";

type buttonprops = {
    title: string;
    loading?: boolean; // Add loading prop
} & TouchableOpacityProps;

export default function Custumbutton({ title, loading, ...props }: buttonprops) {
    return (
        <TouchableOpacity
            {...props}
            style={[styles.button, props.style]}
            disabled={loading || props.disabled}
            accessibilityLabel={title}
            accessible
        >
            {loading ? (
                <AntDesign name="loading1" size={20} color="white" style={styles.spinner} />
            ) : (
                <>
                    <Text style={styles.loginButtonText}>{title}</Text>
                    <AntDesign name="arrowright" size={20} color="white" />
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#06D6A0", // Default green background
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        marginRight: 10,
    },
    spinner: {
        marginLeft: 10,
    },
});
