import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component {
	state = {
		authCode: '',
		user: {}
	}

	onChangeText(authCode) {
		this.setState({ authCode });
	}

	signUp() {
		Auth.signUp({
			username: 'meuser',
			password: 'Mypassword1',
			attributes: {
				email: 'user@mail.com',
				phone: '+447918236795'
			}
		})
		.then(res => {
			console.log('successful signup: ', res);
		})
		.catch(err => {
			console.log('error signing up: ', err);
		});
	}

	confirmUser() {
		const { authCode } = this.state;

		Auth.confirmSignUp('meuser', authCode)
		.then(res => {
			console.log('successful confirmation: ', res);
		})
		.catch(err => {
			console.log('error confirming user: ', err);
		});
	}

	signIn() {
		Auth.signIn(username, password)
		.then(user => this.setState({ user }))
		.catch(err => {
			console.log('error signing in: ', err);
		});
	}

	confirmSignIn() {
		Auth.confirmSignIn(user, authCode)
		.then(user => {
			console.log('user: ', user);
		})
		.catch(err => {
			console.log('error confirming sign in: ', err);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Button
					title='Sign Up'
					onPress={this.signUp.bind(this)}
				/>
				<TextInput
					style={styles.input}
					onChangeText={value => this.onChangeText(value)}
				/>
				<Button
					title='Verify'
					onPress={this.confirmUser.bind(this)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		backgroundColor: '#ededed',
		marginVertical: 10
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#f5fcff'
	}
});

export default App;
