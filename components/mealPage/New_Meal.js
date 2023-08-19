import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from '../screenChange/Tab';

const New_Meal = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default New_Meal;
