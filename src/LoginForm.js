import React, {Component} from 'react';
import {TextInput, Alert} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import Button from './ortak/Button';
import Card from './ortak/card';
import CardSection from './ortak/CardSection';
import Spinner from './ortak/spinner';
class LoginForm extends Component {
  state = {email: '', password: '', loading: false};
  clickLogin() {
    this.setState({loading: true});
    const {email, password} = this.state;
    if (email === '' || password === '') {
      this.setState({loading: false});
      Alert.alert('Mesaj', 'Her iki alanda dolu olmalı', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.loginSuccess.bind(this))
        .catch(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(this.loginSuccess.bind(this))
            .catch(this.loginFail.bind(this));
        });
    }
  }
  loginSuccess() {
    console.log('başarılı');
    this.setState({loading: false});
  }
  loginFail() {
    console.log('Hatalı');
    this.setState({loading: false});
    Alert.alert('Mesaj', 'Kullanıcı adı veya şifreniz hatalı', [
      {text: 'Tamam', onPress: () => null},
    ]);
  }
  renderButton() {
    if (!this.state.loading) {
      return <Button onPress={this.clickLogin.bind(this)}>Giriş</Button>;
    }
    return <Spinner size="small" />;
  }
  render() {
    const {containerStyle, subContainerStyle, inputStyle} = styles;
    return (
      <Card>
        <CardSection>
          <TextInput
            placeholder="E-mail"
            style={inputStyle}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={inputStyle}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}
const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  subContainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
};
export default LoginForm;
