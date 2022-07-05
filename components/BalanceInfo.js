import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS, icons, SIZES } from "../constants";

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
  return (
    <View style={{
      ...containerStyle,
    }}>
      <Text style={{
        color: COLORS.white,
        fontSize: 18
      }}>
        {title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{
          color: COLORS.lightGray3,
          fontSize: 18
        }}>$</Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.white,
            fontSize: 18
          }}>
          {displayAmount.toLocaleString()}
        </Text>
        <Text style={{
          color: COLORS.lightGray3,
          fontSize: 18
        }}> USD</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          marginTop: 5
        }}
      >
        {
          changePct != 0 &&
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
              transform: (changePct > 0) ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
            }}
          />
        }

        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color: (changePct == 0) ? COLORS.lightGray :
              (changePct > 0) ? COLORS.lightGreen : COLORS.red,
          }}>
          {changePct.toFixed(2)}
          0.03%

        </Text>

        <Text
          style={{
            marginLeft: SIZES.padding,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: COLORS.gray,
            color: COLORS.white
          }}>
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
