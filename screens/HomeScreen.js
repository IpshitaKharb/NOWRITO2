import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import firebase from 'firebase'
import Dashboard from '../screens/Dashboard'

let customFonts = {
  Caligraphy1: require('../Font/BebasNeue-Regular.ttf'),
  Caligraphy2: require('../Font/MeowScript-Regular.ttf'),
}

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      profile_image: 'Loading Image',
      name: 'Loading Name',
    }
  }

  toggleSwitch() {
    const previous_state = this.state.isEnabled
    const theme = !this.state.isEnabled ? 'dark' : 'light'
    var updates = {}
    updates[
      '/users/' + firebase.auth().currentUser.uid + '/current_theme'
    ] = theme
    firebase.database().ref().update(updates)
    this.setState({ isEnabled: !previous_state, light_theme: previous_state })
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this._loadFontsAsync()
    this.toggleSwitch()
  }

  async fetchUser() {
    let theme, name, image
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme
        name = `${snapshot.val().first_name}  ${snapshot.val().last_name}`
        image = snapshot.val().profile_picture
      })
    this.setState({
      light_theme: theme === 'light' ? true : false,
      isEnabled: theme === 'light' ? false : true,
      name: name,
      profile_image: image,
    })
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={
              this.state.light_theme
                ? require('../assets/bg1.jpeg')
                : require('../assets/bg2.jpeg')
            }
            style={styles.backgroundImageLight}
          >
            <View style={styles.appTitle}>
              <View style={styles.appIcon}>
                <Image
                  source={require('../assets/My-project-1.png')}
                  style={styles.iconImage}
                ></Image>
              </View>
              <View style={styles.appTitleTextContainer}></View>
            </View>
            <View style={styles.screenContainer}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: this.state.profile_image }}
                  style={styles.profileImage}
                ></Image>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.nameTextLight
                      : styles.nameText
                  }
                >
                  {this.state.name}
                </Text>
              </View>
              <View style={styles.themeContainer}>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.themeTextLight
                      : styles.themeText
                  }
                >
                  Theme
                </Text>

                <Switch
                  style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                  trackColor={{
                    false: 'white',
                    true: this.state.light_theme ? '#eee' : 'white',
                  }}
                  thumbColor={this.state.isEnabled ? 'grey' : 'pink'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    this.toggleSwitch()
                    this.fetchUser()
                  }}
                  value={this.state.isEnabled}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('TypingScreen')}
            >
              <Text
                style={
                  this.state.light_theme
                    ? styles.getStartedthemeTextLight
                    : styles.getStartedthemeText
                }
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  getStarted: {
    width: 160,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(30),
    color: 'white',
    borderColor: 'black',
    backgroundColor: 'red',
  },

  appIcon: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(100),
    marginRight: RFValue(-450),
  },
  backgroundImageLight: {
    flex: 1,
    resizeMode: 'cover',
  },
  iconImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',

    justifyContent: 'center',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(70),
    marginTop: RFValue(300),
  },

  nameText: {
    color: 'white',
    fontSize: RFValue(40),
    fontFamily: 'Caligraphy1',
    marginTop: RFValue(100),
  },
  nameTextLight: {
    color: 'black',
    fontSize: RFValue(40),
    fontFamily: 'Caligraphy1',
    marginTop: RFValue(100),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(20),
  },
  themeText: {
    color: 'white',
    fontSize: RFValue(30),
    fontFamily: 'Caligraphy2',
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: 'black',
    fontSize: RFValue(30),
    fontFamily: 'Caligraphy2',
    marginRight: RFValue(15),
  },

  getStartedthemeText: {
    color: 'white',
    fontSize: RFValue(30),
    marginLeft: RFValue(105),
  },
  getStartedthemeTextLight: {
    color: 'black',
    fontSize: RFValue(30),
    marginLeft: RFValue(105),
  },
})
