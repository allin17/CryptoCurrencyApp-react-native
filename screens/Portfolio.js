import React, { useCallback, useState } from "react";
import {
  View,
  Text, FlatList, TouchableOpacity, Image,
} from "react-native";
import { MainLayout } from "./index";
import { getCoinMarket, getHoldings } from "../store/market/marketActions";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { holdings } from "../constants/dummy";
import { COLORS, icons, SIZES } from "../constants";
import CurrentBalanceSection from "../components/CurrentBalanceSection";
import Chart from "../components/Chart";

const Portfolio = ({getHoldings, myHoldings}) => {
  const [selectedCoin, setSelectedCoin] = useState(null)

  useFocusEffect(
    useCallback(() => {
      getHoldings(holdings)
    }, [])
  )

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0)
  let valueChange =
    myHoldings?.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
  let percChange = valueChange / (totalWallet - valueChange) * 100

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black
        }}
      >
        {/*Header - Current balance*/}
        <CurrentBalanceSection
          totalWallet={totalWallet}
          percChange={percChange}
        />
        {/*Chart*/}

        <Chart
          containerStyle={{
            marginTop: SIZES.radius
          }}
          chartPrices={selectedCoin
          ? selectedCoin?.sparkline_in_7d?.value
          : myHoldings[0]?.sparkline_in_7d?.value}

        />
        {/*Your assets*/}

        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
          ListHeaderComponent={
            <View>
              {/*Section Title*/}
                <Text style={{color: COLORS.white, fontSize: 18}}>
                  Your Assets
                </Text>
              {/*Header label*/}
              <View style={{
                flexDirection: 'row',
                marginTop: SIZES.radius
              }}>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3
                  }}
                >Asset</Text>
                <Text style={{
                  flex: 1,
                  color: COLORS.lightGray3,
                  textAlign: 'right'
                }}>
                  Price
                </Text>
                <Text style={{
                  flex: 1,
                  color: COLORS.lightGray3,
                  textAlign: 'right'
                }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={(item) => {
            item = item.item
            let priceColor = item.price_change_percentage_7d_in_currency == 0
            ? COLORS.lightGray3 : item.price_change_percentage_7d_in_currency > 0
            ? COLORS.lightGreen : COLORS.red

            return (
              <TouchableOpacity
                onPress={() => setSelectedCoin(item)}
                style={{
                  flexDirection: 'row',
                  height: 55
                }}
              >
                {/*Asset*/}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20
                    }}
                  />

                  <Text
                    style={{
                      width: 20,
                      height: 20
                    }}
                  >{item.name}</Text>
                </View>
                {/*Price*/}
                <View style={{
                  flex: 1,
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    textAlign: 'right',
                    color: COLORS.white,
                    lineHeight: 15
                  }}>
                    ${item.current_price.toLocaleString()}
                  </Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}>
                    {
                      item.price_change_percentage_7d_in_currency != 0 &&
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform: item.price_change_percentage_7d_in_currency > 0
                          ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                        }}
                      />
                    }
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        lineHeight: 15
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)} %
                    </Text>
                  </View>
                </View>
                {/*Holdings*/}
                <View style={{
                  flex: 1,
                  justifyContent: 'center'
                }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      lineHeight: 15
                    }}
                  >
                    $ {item.total.toLocaleString()}
                  </Text>

                  <Text style={{
                    textAlign: 'right',
                    color: COLORS.lightGray3,
                    lineHeight: 15
                  }}>
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (holdings, currency, coinList, orderBy,
                  sparkline, priceChangePerc, perPage, page) => {
      return dispatch(getHoldings(holdings, currency, coinList, orderBy,
        sparkline, priceChangePerc, perPage, page))
    }
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

