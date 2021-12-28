import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Google from 'expo-google-app-auth'
import firebase from 'firebase'

import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

let customFonts = {
  Caligraphy: require('../Font/MeowScript-Regular.ttf'),
}

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      x: [],
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this._loadFontsAsync()
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true
        }
      }
    }
    return false
  }

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken,
        )

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            // if (result.additionalUserInfo.isNewUser) {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                current_theme: 'dark',
              })
              .then(function (snapshot) {})
            // }
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            // The email of the user's account used.
            var email = error.email
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential
            // ...
            // alert(errorMessage);
            // alert(email);
            // alert(credential);
          })
      } else {
        console.log('User already signed-in Firebase.')
      }
    })
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '546909617015-v2fqpq7bu8c457odj4m2efb9j60qtm5s.apps.googleusercontent.com',
        iosClientId:
          '546909617015-kih7ohvtn8f5rdjaiel711gu30ovb0o7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        this.onSignIn(result)
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      console.log(e.message)

      return { error: true }
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require('../assets/My-project.png')}
              style={styles.appIcon}
            ></Image>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}
            >
              <Image
                source={require('../assets/google.png')}
                style={styles.googleIcon}
              ></Image>
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.4,
    // justifyContent: "center",
    // alignItems: "center"
  },
  appIcon: {
    width: 800,
    height: 800,
    resizeMode: 'contain',

    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginTop: '50%',
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  googleText: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'Caligraphy',
  },
})
