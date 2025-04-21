import React from "react";
import { Controller } from "react-hook-form";
import { TextInput,Text, TextInputProps } from "react-native";

type inputprops = {
  name: string;
  control: any;
} & TextInputProps;

export default function Input({ name, control, ...props }: inputprops) {
//   const style = {
//     input: 'border-blue-400 w-[300px] border rounded-[7px] p-3 text-base',
//   };

  return (
    <Controller
      name={name}
      control={control}
      
      render={({ field: { value, onChange, onBlur },fieldState:{error} }) => (
        <>
        <TextInput
        
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...props}
        />
        {<Text className="text-red-700 p-2 ml-2 -mt-4">{error?.message}</Text>}
        </>
        
      )}
    />
  );
}
