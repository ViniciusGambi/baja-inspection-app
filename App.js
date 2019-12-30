import FormsScreen from './src/screens/FormsScreen'
import QuestionScreen from './src/screens/QuestionScreen'
import FormDetailScreen from './src/screens/FormDetailScreen'


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  
  { FormsScreen, QuestionScreen, FormDetailScreen },
  { initialRouteName: 'FormsScreen'}
);

export default createAppContainer(AppNavigator);