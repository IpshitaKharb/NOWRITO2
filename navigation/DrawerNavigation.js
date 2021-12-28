import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Logout from '../screens/LogoutScreen'
import firebase from 'firebase'
import Home from '../screens/HomeScreen'
import StackNavigator from './StackNavigator'
import CustomSidebarMenu from '../screens/CustomSidebarMenu'

const Drawer = createDrawerNavigator()

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      light_theme: true,
    }
  }

  componentDidMount() {
    var theme
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme
      })
    this.setState({ light_theme: theme === 'light' ? true : false })
  }

  render() {
    var props = this.props
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: this.state.light_theme ? 'black' : '#ff8000',
          itemStyle: { marginVertical: 5 },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />

        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    )
  }
}
