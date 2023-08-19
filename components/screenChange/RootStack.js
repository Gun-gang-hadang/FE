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
        options={{
          title: '혈당 입력',

          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerBackVisible: false,

          headerTintColor: '#000000',
          headerTitleStyle: {
            fontFamily: 'Jamsil4',
            fontSize: 35,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
