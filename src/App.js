import React, { Component } from 'react';
import { TextInput, View, Stylesheet, Button } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component {
	state = {
		authCode: ''
	}

	onChangeText(value) {
		this.setState({
			authCode: value
		});
	}

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
			<View style={styles.container}>
				<Button>
					title="Sign Up"
					onPress={this.signUp.bind(this)}
				</Button>
				<TextInput style={styles.input}>
					onChangeText={value => this.onChangeText(value)}
				</TextInput>
			</View>
		);
	}
}

const styles = Stylesheet.create({
	input: {
		height: 50,
		backgroundColor: 'ededed',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#f5fcff'
	}
});

export default App;
