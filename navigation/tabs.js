import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, icons } from "../constants";
import { Home, Market, Portfolio, Profile } from "../screens";
import TabIcon from "../components/TabIcon";
import { useDispatch, useSelector } from "react-redux";
import { setTradeModalVisibility } from "../store/tab/tabActions";
import { TouchableOpacity } from "react-native"

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={onPress}
      >
      {children}
    </TouchableOpacity>
  )
}

const Tabs = () => {
  const dispatch = useDispatch()
  function tradeTabButtonOnClickHandler() {
      dispatch(setTradeModalVisibility(!isTradeModalVisible))
    }

  const isTradeModalVisible = useSelector(
    state => state.tabReducer.isTradeModalVisible
  )


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",

        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if(!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.home}
                  label="Home"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if(isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if(!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if(isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                iconStyle={(isTradeModalVisible) ? {
                  width: 15,
                  height: 15
                }: null }
                icon={isTradeModalVisible ? icons.close : icons.trade}
                label='Trade'
                isTrade={true}
              />
            )
          },
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={() => tradeTabButtonOnClickHandler()}
            />
          )
        }}
        listeners={{
          tabPress: e => {
            if(isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if(!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.market}
                  label='Market'
                />
              )
            }
          }
        }}
        listeners={{
          tabPress: e => {
            if(isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if(!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label='Profile'
                />
              )
            }
          }
        }}
        listeners={{
          tabPress: e => {
            if(isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
