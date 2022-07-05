import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text, TouchableOpacity,
  Animated, FlatList, Image,
} from "react-native";
import { getCoinMarket } from "../store/market/marketActions";
import { connect } from "react-redux";
import { COLORS, constants, icons, SIZES } from "../constants"
import MainLayout from "./MainLayout";
import HeaderBar from "../components/HeaderBar";
import TextButton from "../components/TextButton";
import TabIndicator from "../components/TabIndicator";
import RenderList from "../components/RenderList";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef(),
}));

const Tabs = ({scrollX, onMarketTabPress}) => {
  const [measureLayout, setMeasureLayout] = useState([])
  const containerRef = useRef()

  useEffect(() => {
    let ml = []
    marketTabs.forEach(marketTab => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x, y, width, height
          })

          if(ml.length === marketTab.length) {
            setMeasureLayout(ml)
          }
        }
      )
    })
  }, [containerRef.current])

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
      }}
    >
      {/*Tab Indicator*/}
      {measureLayout.length > 0 &&
        <TabIndicator
          measureLayout={measureLayout}
          scrollX={scrollX}
        />}

      {/*Tabs*/}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
            onPress={() => onMarketTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: 18,
              }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({ coins, getCoinMarket }) => {

  const scrollX = React.useRef(new Animated.Value(0)).current
  const marketTabScrollViewRef = useRef()

  const onMarketTabPress = useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width
    })
  })

  useEffect(() => {
    getCoinMarket();
  },[]);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs
          onMarketTabPress={onMarketTabPress}
          scrollX={scrollX}
        />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton
          label="USD"
        />
        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />

      </View>
    );
  }



  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >

        {/*Header*/}
        <HeaderBar title="Market" />
        {/*Tab Bar*/}
        {renderTabBar()}
        {/*Buttons*/}
        {renderButtons()}
        {/*Market List*/}
        <RenderList marketTabs={marketTabs} coins={coins} scrollX={scrollX}/>
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (currency, coinList, orderBy, sparkline,
                    priceChangePerc, perPage, page,
    ) => {
      return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline,
        priceChangePerc, perPage, page));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);

