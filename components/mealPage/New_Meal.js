import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './navigation/Tab';

import colors from '../assets/colors/colors';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: 60,
    fontFamily: 'Jamsil3',
    color: '#000000',
  },
});

export default App;
