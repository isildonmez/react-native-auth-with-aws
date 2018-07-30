import React, { Component } from 'react';
import { Text } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component {
	signUp() {
		Auth.signUp({
			username: 'meuser',
			password: 'Mypassword1',
			email: 'user@mail.com',
			phone: '+447918236790'
		})
		.then(res => {
			console.log('signed up!', res);
		})
		.catch(err => {
			console.log('err:', err);
		});
	}

	verify() {
		Auth.confirmSignUp('meuser', authCode)
		.then(res => {
			console.log('confirmed!', res);
		})
		.catch(err => {
			console.log('err confirming: ', err);
		});
	}

	render() {
		return (
			<Text>Hello World!</Text>
		);
	}
}

export default App;
