import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Typing from './screens/TypingScreen'
import Login from './screens/Login'
import Loading from './screens/Loading'
import Dashboard from './screens/Dashboard'
import Home from './screens/HomeScreen'
import firebase from 'firebase'
import { firebaseConfig } from './config'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const AppNavigator = createSwitchNavigator({
  LoadingScreen: Loading,
  LoginScreen: Login,
  DashboardScreen: Dashboard,
  HomeScreen: Home,
  TypingScreen: Typing,
})

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return <AppContainer />
}

// VI COMMAND ==>>  openssl rand -base64 32 | openssl sha1 -c
// execute it in ==>> Program Files/Git/usr/bin
