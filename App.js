import FormsScreen from './screens/FormsScreen'
import QuestionScreen from './screens/QuestionScreen'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  { FormsScreen, QuestionScreen },
  { initialRouteName: 'FormsScreen'}
);

export default createAppContainer(AppNavigator);