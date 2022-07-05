import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";

const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode='contain'
        style={{
          width: 20,
          height: 20
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.base
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
