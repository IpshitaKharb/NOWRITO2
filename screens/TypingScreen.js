import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

let customFonts = {
  myFont: require('../Font/Handwriting/IpshitaHandwriting.ttf'),
}

export default class TypingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      dropdownHeight: 40,
      previewFont: 'ipshitaHandwriting',
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this._loadFontsAsync()
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      let preview_font = {
        homemadeapple: require('../Font/Handwriting/HomemadeApple.ttf'),
        lazy_bear: require('../Font/Handwriting/Lazybear.ttf'),
        liujianmaocao: require('../Font/Handwriting/LiuJianMaoCao.ttf'),
        ipshitaHandwriting: require('../Font/Handwriting/IpshitaHandwriting.ttf'),
        pola: require('../Font/Handwriting/POLA.ttf'),
        quest: require('../Font/Handwriting/QUEST.ttf'),
        anandaAkchyar: require('../Font/Handwriting/AnandaAkchyar.ttf'),
      }
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.paperContainer}>
            <Image
              source={require('../assets/Paper.jpeg')}
              style={styles.image}
            />
            <TextInput
              onChangeText={(yourText) => this.setState({ yourText })}
              placeholder={'Your Text'}
              style={styles.inputText}
              multiline={true}
              numberOfLines={20}
            />
            <DropDownPicker
              items={[
                { label: 'HomemadeApple', value: 'homemadeApple' },
                { label: 'Lazy Bear', value: 'lazy_bear' },
                { label: 'LiuJianMaoCao', value: 'liujianmaocao' },
                { label: 'Pola', value: 'pola' },
                { label: 'Quest', value: 'quest' },
                { label: 'My_Handwriting', value: 'ipshitaHandwriting' },
                { label: 'Ananda Akchyar', value: 'anandaAkchyar' },
              ]}
              defaultValue={'ipshitaHandwriting'}
              containerStyle={{
                height: 40,
                borderRadius: RFValue(20),
                marginBottom: RFValue(20),
                marginHorizontal: RFValue(10),
              }}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 })
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 })
              }}
              style={{ backgroundColor: 'transparent' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: this.state.light_theme ? '#eee' : '#2f345d',
              }}
              labelStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              arrowStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              onChangeItem={(item) =>
                this.setState({
                  previewFont: item.value,
                })
              }
            />
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

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#476',
  },

  paperContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f6',
    marginLeft: RFValue(10),
    marginRight: RFValue(10),
    borderRadius: RFValue(30),
  },

  image: {
    width: '5%',
    height: '7%',
    marginTop: '90%',
    // resizeMode: 'contain',
    backgroundColor: '#000',
  },

  inputText: {
    marginTop: '-100%',
    height: '97%',
    width: '95%',
    fontFamily: 'myFont',
    fontSize: RFValue(20),
    color: 'blue',
    borderWidth: RFValue(3),
    paddingTop: RFValue(10),
    textAlignVertical: 'top',
    marginLeft: RFValue(18),
  },

  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#385',
    marginLeft: RFValue(10),
    marginRight: RFValue(10),
    borderRadius: RFValue(30),
  },

  handwriting1: {},
})
