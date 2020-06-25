/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {View} from 'react-native';
//import {Config} from './config';
import firebase from '@firebase/app';
import '@firebase/auth';
import Header from './src/ortak/Header';
import LoginForm from './src/LoginForm';
import CardSection from './src/ortak/CardSection';
import Button from './src/ortak/Button';
import Spinner from './src/ortak/spinner';
class App extends Component {
  state = {loggedIn: null};
  UNSAFE_componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBLYy5k7Z394TZX1cnhn5PPtZkbPkniEH0',
      authDomain: 'kimlikdogrulama-5d46b.firebaseapp.com',
      databaseURL: 'https://kimlikdogrulama-5d46b.firebaseio.com',
      projectId: 'kimlikdogrulama-5d46b',
      storageBucket: 'kimlikdogrulama-5d46b.appspot.com',
      messagingSenderId: '91828802674',
      appId: '1:91828802674:web:1fdd680fc523ba731e9eeb',
      measurementId: 'G-68X3KF96W7',
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }
  clickLogout() {
    firebase.auth().signOut();
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={this.clickLogout.bind(this)}>Çıkış</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Giriş Ekranı" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
