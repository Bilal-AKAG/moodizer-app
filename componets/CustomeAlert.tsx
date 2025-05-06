import React, { useState } from "react";
import { Animated, Modal, View, Text, TouchableOpacity } from "react-native";

type CustomModalProps = {
  visible: boolean;
  onConfirm: React.ReactNode;
  onconfirmText: string;
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  icon,
  onClose,
  onConfirm,
  onconfirmText = "delete",
}) => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(100))[0];

  const openModal = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  if (visible) openModal();

  return (
    <Modal transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-blue-500 bg-opacity-50">
        <Animated.View
          className="bg-blue-600 p-6 rounded-lg "
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], }}
        >
          <View className="flex items-center ">
            {icon && <View className="mr-2 p-4">{icon}</View>}
            <Text className="text-lg">{title}</Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity onPress={closeModal}>
              <Text className=" bg-red-500">Close</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text className=" bg-red-red">{onconfirmText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;
