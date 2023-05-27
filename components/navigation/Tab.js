import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BloodSugar, Meal, Measure} from './TabScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      style={styles.tab}
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.bg,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontFamily: 'TheJamsil4-Medium',
          fontSize: 35,
        },

        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarActiveBackgroundColor: colors.main,
        tabBarInactiveBackgroundColor: colors.secondary,
        tabBarLabelStyle: {
          fontFamily: 'TheJamsil3-Regular',
          fontSize: 25,
        },

        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '내 혈당') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === '식단분석') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === '측정방법') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarStyle: {
          height: 60,
        },
      })}>
      <Tab.Screen name="내 혈당" component={BloodSugar} />
      <Tab.Screen name="식단분석" component={Meal} />
      <Tab.Screen name="측정방법" component={Measure} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },

  image: {
    marginBottom: 100,
  },
});

export default TabNavigation;
