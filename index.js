/**
 * @format
 */

import {AppRegistry} from 'react-native';

// 로그인 페이지
import Login from './components/mainPage/Login';
import newnewApp from './newnewApp';
//import newApp from './newApp';
import {name as appName} from './app.json';
import StartScreen from './components/mainPage/StartScreen';

//AppRegistry.registerComponent(appName, () => Login);
//AppRegistry.registerComponent(appName, () => newApp);
AppRegistry.registerComponent(appName, () => StartScreen);