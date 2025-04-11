import { Stack, Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import TabIcon from "../componets/tabicon";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const DashLayout = () => {
  return <Tabs screenOptions={{
            tabBarStyle:{
              height:70,
              
              
            }
          }}>
    <Tabs.Screen
    name="index"
    options={{
      headerShown:false,
      title:'',
      tabBarIcon:()=>(
        <Ionicons name='home' size={30}/>
      )
    }}
    />

    <Tabs.Screen
    name="addtext"
    options={{
      headerShown:false,
      title:'',
      tabBarIcon:()=>(
        <Entypo name="squared-plus" size={30} color="black" />
        
      )
    }}
    
    />
    <Tabs.Screen
    name="history"
    options={{
      headerShown:false,
      title:'',
      tabBarIcon:()=>(
        <FontAwesome name="history" size={30} color="black" />
        
      )
    }}
    
    />
    <Tabs.Screen
    name="profile"
    options={{
      headerShown:false,
      title:'',
      tabBarIcon:()=>(
        <AntDesign name="profile" size={30} color="black" />
      )
    }}
    
    />
    
  </Tabs>;
};

export default DashLayout;
