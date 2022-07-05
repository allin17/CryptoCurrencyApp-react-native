import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView, Image, TouchableOpacity, Switch
} from "react-native";
import { MainLayout } from "./index";
import HeaderBar from "../components/HeaderBar";
import { COLORS, dummyData, icons, SIZES } from "../constants";

const SectionTitle = ({title}) => {
  return (
    <View style={{
      marginTop: SIZES.padding
    }}>
      <Text style={{
        color: COLORS.lightGray3,
        fontSize: 18
      }}>{title}</Text>
    </View>
  )
}

const Setting = ({title, value, type, onPress}) => {
  if(type == 'button') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center'
        }}
        onPress={onPress}
      >
        <Text style={{
          flex: 1,
          color: COLORS.white,
          fontSize: 18
        }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{
            marginRight: SIZES.radius,
            color: COLORS.lightGray3,
            fontSize: 18
          }}>
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.white
            }}
          />
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center'
        }}
      >
        <Text style={{
          color: COLORS.white,
          flex: 1,
          fontSize: 18
        }}>
          {title}
        </Text>
        <Switch
          value={value}
          onValueChange={(value) => onPress(value)}
        />
      </View>
    )
  }
}

const Profile = () => {
  const [faceId, setFaceId] = useState(true)

  return (
    <MainLayout>
      <View style={{
        backgroundColor: COLORS.black,
        flex: 1
      }}>
        {/*Header*/}
        <HeaderBar
          title={'Profile'}
        />

        {/*Details*/}
        <ScrollView>
          {/*Email & User Id*/}
          <View style={{
            flexDirection: 'row',
            marginTop: SIZES.radius
          }}>
            <View style={{
              flex: 1
            }}>
              <Text style={{
                color: COLORS.white,
                fontSize: 18
              }}>
                {dummyData.profile.email}
              </Text>
              <Text style={{
                color: COLORS.lightGray3
              }}>ID: {dummyData.profile.id}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Image
                source={icons.verified}
                style={{
                  height: 25,
                  width: 25
                }}
              />
              <Text style={{
                marginLeft: SIZES.base,
                color: COLORS.lightGreen,
                fontSize: 18
              }}>
                Verified
              </Text>
            </View>
          </View>

          {/*APP*/}
          <SectionTitle title="APP"/>
          <Setting
            title='Launch Screen'
            value='Home'
            type='button'
            onPress={() => console.log('press')}
          />
          <Setting
            title='Appearance'
            value='Dark'
            type='button'
            onPress={() => console.log('press')}
          />

          {/*ACC*/}
          <SectionTitle title="ACCOUNT" />

          <Setting
            title='Payment Currency'
            value='USD'
            type='button'
            onPress={() => console.log('press')}
          />
          <Setting
            title='Language'
            value='English'
            type='button'
            onPress={() => console.log('press')}
          />

          {/*SECURITY*/}
          <SectionTitle title="SECURITY" />

          <Setting
            title='FaceID'
            value={faceId}
            type='switch'
            onPress={(value) => setFaceId(value)}
          />

          <Setting
            title='Password Settings'
            value=''
            type='button'
            onPress={() => console.log('press')}
          />

          <Setting
            title='Change Password'
            value=''
            type='button'
            onPress={() => console.log('press')}
          />

          <Setting
            title='2-Factor Authentication'
            value=''
            type='button'
            onPress={() => console.log('press')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
