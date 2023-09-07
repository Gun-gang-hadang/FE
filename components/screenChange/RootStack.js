import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from './Tab';
import BloodrecordScreen from '../bloodPage/BloodrecordScreen';
import MealAnalysis from '../mealPage/MealAnalysis';
import BloodScreen from '../bloodPage/BloodScreen';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tab} options={{headerShown: false}} />
      <Stack.Screen
        name="BloodScreen"
        component={BloodScreen}
        options={{headerShown: false,tabBarStyle: {display: 'flex'}}}
      />
      <Stack.Screen
        name="Write"
        component={BloodrecordScreen}
        options={{headerShown: false,tabBarStyle: {display: 'flex'}}}
      />
      <Stack.Screen
        name="MealAnalysis"
        component={MealAnalysis}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
