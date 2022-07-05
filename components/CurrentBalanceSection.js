import React from "react";
import { Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import BalanceInfo from "./BalanceInfo";

const CurrentBalanceSection = ({totalWallet, percChange}) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: COLORS.gray
      }}
    >
      <Text
        style={{
          marginTop: 50,
          color: COLORS.white
        }}
      >
        Portfolio
      </Text>
      <BalanceInfo
        title="Current Balance"
        displayAmount={totalWallet}
        changePct={percChange}
        containerStyle={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding
        }}
      />
    </View>
  );
};

export default CurrentBalanceSection;
