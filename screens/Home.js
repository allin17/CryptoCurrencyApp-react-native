import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image, TouchableOpacity,
} from "react-native";
import { MainLayout } from "./index";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCoinMarket, getHoldings } from "../store/market/marketActions";

import { useFocusEffect } from "@react-navigation/native";
import { holdings } from "../constants/dummy";
import { COLORS, icons, SIZES } from "../constants";
import BalanceInfo from "../components/BalanceInfo";
import IconTextButton from "../components/IconTextButton";
import Chart from "../components/Chart";
import axios from "axios";


const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  const [selectedCoin, setSelectedCoin] = useState(null)

    useFocusEffect(
      useCallback(() => {
        getHoldings(holdings)
        getCoinMarket()
      }, [])
    )

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0)
  let valueChange = myHoldings?.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
  let percChange = valueChange / (totalWallet - valueChange) * 100

    function WalletInfoSection() {
        return (
          <View
            style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}
          >
              {/*Balance info*/}
              <BalanceInfo
                title='Your wallet'
                displayAmount={totalWallet}
                changePct={percChange}
                containerStyle={{
                  marginTop: 50,
                }}
              />

           {/* Buttons*/}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginBottom: -15,
                paddingHorizontal: SIZES.radius
              }}
            >
              <IconTextButton
                label={"Transfer"}
                icon={icons.send}
                containerStyle={{
                  flex: 1,
                  height: 40,
                  marginRight: SIZES.radius
                }}
                onPress={() => console.log("Transfer")}
              />
              <IconTextButton
                label={"Withdraw"}
                icon={icons.withdraw}
                containerStyle={{
                  flex: 1,
                  height: 40,
                  marginRight: SIZES.radius
                }}
                onPress={() => console.log("Withdraw")}
              />
            </View>
          </View>
        )
    }

    return (
      <MainLayout>
        <View style={{
            flex: 1,
            backgroundColor: COLORS.black
        }}>
            {/*Header section wallet info*/}
            <WalletInfoSection />

          <Chart
            containerStyle={{
              marginTop: SIZES.padding * 2
            }}
            chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d.price
             : coins[0]?.sparkline_in_7d?.price}
          />

{/*
          Top Cryptocurrency
*/}
          <FlatList
            data={coins}
            keyExtractor={i => i.id}
            contentContainerStyle={{
              marginTop: 30,
              paddingHorizontal: SIZES.padding
            }}
            ListHeaderComponent={
              <View style={{marginBottom: SIZES.radius}}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18
                  }}
                >Top Cryptocurrency</Text>
              </View>
            }
            renderItem={(item) => {

              let priceColor = item.item.price_change_percentage_7d_in_currency == 0
              ? COLORS.lightGray3 : item.item.price_change_percentage_7d_in_currency > 0
              ? COLORS.lightGreen : COLORS.red

              return (
                <TouchableOpacity
                  onPress={() => setSelectedCoin(item.item)}
                  style={{
                    height: 55,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/*ICONS*/}
                  <View
                    style={{
                      width: 35
                    }}
                  >
                    <Image
                      source={{uri: item.item.image}}
                      style={{
                        height: 20,
                        width: 20
                      }}
                    />
                  </View>

                  {/*NAME*/}
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white
                      }}
                    >
                      {item.item.name}
                    </Text>
                  </View>

                  {/*FIGURES*/}
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        textAlign: 'right'
                      }}
                    >
                      $ {item.item.current_price}
                    </Text>

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}>
                      {
                        item.item.price_change_percentage_7d_in_currency != 0 &&
                        <Image
                          source={icons.upArrow}
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor,
                            transform: item.item.price_change_percentage_7d_in_currency > 0
                            ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                          }}
                        />
                      }
                      <Text
                        style={{
                          marginLeft: 5, color: priceColor,
                          lineHeight: 15
                      }}>
                        {item.item.price_change_percentage_7d_in_currency.toFixed(2)}%
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>)
            }}
            ListFooterComponent={
              <View style={{marginBottom: 50}}
              />
            }
          />
        </View>
      </MainLayout>
    )
}

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (holdings, currency, coinList, orderBy,
      sparkline, priceChangePerc, perPage, page) => {
      return dispatch(getHoldings(holdings, currency, coinList, orderBy,
        sparkline, priceChangePerc, perPage, page))
    },
    getCoinMarket: (currency, coinList, orderBy, sparkline,
        priceChangePerc, perPage, page
    ) => {
      return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline,
        priceChangePerc, perPage, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
