import React from 'react';
import {Text, StyleSheet} from 'react-native';
import MeasureScreen from './components/measurePage/MeasureScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function FirstScreen() {
  return <Text>내 혈당</Text>;
}

function SecondScreen() {
  return <Text>식단분석</Text>;
}

/*
function ThirdScreen() {
  return <Text>측정방법</Text>;
}
*/
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="내 혈당"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === '내 혈당') {
              iconName = focused ? 'water' : 'water-outline';
            } else if (route.name === '식단분석') {
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            } else if (route.name === '측정방법') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color='black' />;
          },
          tabBarInactiveBackgroundColor: '#FED5AF',
          tabBarActiveBackgroundColor: '#FD9639',
          tabBarLabelStyle: {
            fontSize: 20,
            color: 'black',
            fontFamily: 'TheJamsil3-Regular',
          },
          tabBarItemStyle: {
            borderStyle: 'solid',
            borderColor: '#381B00',
            borderTopWidth: 3,
            borderLeftWidth: 1.5,
            borderRightWidth: 1.5,
          },
          tabBarStyle: [
            {
              display: 'flex',
              height: 60,
            },
            null,
          ],
          headerShown: false,
        })}>
        <Tab.Screen name="내 혈당" component={FirstScreen} />
        <Tab.Screen name="식단분석" component={SecondScreen} />
        <Tab.Screen name="측정방법" component={MeasureScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tab: {
    tabBarActiveTintColor: 'black',
    tabBarStyle: [
      {
        display: 'flex',
      },
      null,
    ],
  },
});

export default App;
