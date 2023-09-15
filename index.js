/**
 * @format
 */

import {AppRegistry} from 'react-native';

// 로그인 페이지
import Login from './components/mainPage/Login';

import newnewApp from './newnewApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
//AppRegistry.registerComponent(appName, () => newnewApp);
