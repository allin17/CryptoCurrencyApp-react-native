import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import IconTextButton from "../components/IconTextButton";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0).current);

  const isTradeModalVisible = useSelector(
    state => state.tabReducer.isTradeModalVisible,
  );
/*
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);*/

  /*const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280]
  })*/

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}

      {/*Background modal*/}
      {isTradeModalVisible && <Animated.View
        style={{
        position: "absolute",
        top: 560,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        padding: SIZES.padding,
        backgroundColor: COLORS.transparentBlack,
      }}
        >
        <IconTextButton
        label="Transfer"
        icon={icons.send}
        onPress={() => console.log("Transfer")}
        />
        <IconTextButton
        label="Withdraw"
        icon={icons.withdraw}
        containerStyle={{
          marginTop: 8
      }}
        onPress={() => console.log("Withdraw")}
        />
        </Animated.View>}


    </View>
  );
}

export default MainLayout;
