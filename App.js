import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer, useRoute  } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import SideScreen from './side';
import Statistics from './statistics';
import Planner from './planner';
import Login from './login';
import CreateId from './createId';
import HomeScreen from './home';

const Drawer = createDrawerNavigator();
const CustomBackButton = ({ navigation }) => {

  const route = useRoute();
  const handlePress = () => {
    if (route.name === '회원가입') {
      navigation.navigate('로그인');
    } else {
      navigation.goBack();
      
    }
  };
  return (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={handlePress}>
      <MaterialIcons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>로그인 정보</Text>
        
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  //const [name, setName] = useState(null);
  const navigationRef = useRef();
  const [userEmail, setEmail] = useState(null);


  const handleLogin = (userEmail) => {
    setEmail(userEmail);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail(null)
    if (navigationRef.current) {
      navigationRef.current.navigate('Home');
    }
  };

  useEffect(() => {
    console.log("로그인 정보");
    console.log(isLoggedIn);
    console.log(userEmail);
    if (isLoggedIn && navigationRef.current) {
      navigationRef.current.navigate('Home');
    }
  }, [isLoggedIn]);

  const handleLogoutButtonPress = () => {
    // 메시지 박스를 표시합니다.
    console.log({isLoggedIn});
    console.log({userEmail});
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '예',
          
          onPress: () => handleLogout(), // Yes를 누르면 로그아웃 함수를 호출합니다.
        },
        {
          text: '아니요',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerType="front"
        screenOptions={({ navigation }) => ({
          headerTitleAlign: 'center',
          drawerPosition: 'right',
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerRight: () => <DrawerToggleButton />,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="home" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="기출문제"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="format-list-numbered" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  기출문제
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="시대별 풀이"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="access-time-filled" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  시대별 풀이
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="유형별 풀이"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="account-balance" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  유형별 풀이
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="킬러문제"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="do-not-disturb-on" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  킬러문제
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="오답노트"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="menu-book" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  오답노트
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="플래너"
          component={Planner}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="timer" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  플래너
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="통계"
          component={Statistics}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="auto-graph" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  통계
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="채점하기"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="check-circle-outline" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  채점하기
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="역사이야기"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="play-circle-filled" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  역사이야기
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="게시판"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="speaker-notes" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  게시판
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="게임"
          component={SideScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="videogame-asset" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  게임
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="로그인"
          options={({ route }) => ({
            drawerLabel: () => {
              return isLoggedIn ? null : <Text>로그인</Text>;
            },
          })}
        >
          {(props) => <Login {...props} onLogin={handleLogin} />}
        </Drawer.Screen>

        <Drawer.Screen
          name="로그아웃"
          options={({ route }) => ({
            drawerLabel: () => {
              return isLoggedIn ? <Text onPress={handleLogoutButtonPress}>로그아웃</Text> : null;
            },
            headerShown: false,
          })}
        >
          {() => {
            return null;
          }}
        </Drawer.Screen>
        <Drawer.Screen name="회원가입" component={CreateId} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};