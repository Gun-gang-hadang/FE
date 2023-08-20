import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from './Tab';
import colors from '../../assets/colors/colors';
import BloodrecordScreen from '../bloodPage/BloodrecordScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tab} options={{headerShown: false}} />
      <Stack.Screen
        name="Write"
        component={BloodrecordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
