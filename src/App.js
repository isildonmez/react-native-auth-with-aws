import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
// import awsconfig from './aws-exports';
import Tabs from '../auth/Tabs';
import Nav from '../nav/Nav';

// Amplify.configure(awsconfig);

class App extends Component {
	state = {
		user: {},
		isLoading: true
	}

	async componentDidMount() {
		StatusBar.setHidden(true);
		try {
			const user = await Auth.currentAuthenticatedUser();
			this.setState({ user, isLoading: false });
		} catch (err) {
			this.setState({ isLoading: false });
		}
	}

	async componentWillReceiveProps(nextProps) {
		try {
			const user = await Auth.currentAuthenticatedUser();
			this.setState({ user });
		} catch (err) {
			this.setState({ user: {} });
		}
	}

	// onChangeText(authCode) {
	// 	this.setState({ authCode });
	// }

	// signUp() {
	// 	Auth.signUp({
	// 		username: 'meuser',
	// 		password: 'Mypassword1',
	// 		attributes: {
	// 			email: 'user@mail.com',
	// 			phone: '+447918236795'
	// 		}
	// 	})
	// 	.then(res => {
	// 		console.log('successful signup: ', res);
	// 	})
	// 	.catch(err => {
	// 		console.log('error signing up: ', err);
	// 	});
	// }

	// confirmUser() {
	// 	const { authCode } = this.state;

	// 	Auth.confirmSignUp('meuser', authCode)
	// 	.then(res => {
	// 		console.log('successful confirmation: ', res);
	// 	})
	// 	.catch(err => {
	// 		console.log('error confirming user: ', err);
	// 	});
	// }

	// signIn() {
	// 	Auth.signIn(username, password)
	// 	.then(user => this.setState({ user }))
	// 	.catch(err => {
	// 		console.log('error signing in: ', err);
	// 	});
	// }

	// confirmSignIn() {
	// 	Auth.confirmSignIn(user, authCode)
	// 	.then(user => {
	// 		console.log('user: ', user);
	// 	})
	// 	.catch(err => {
	// 		console.log('error confirming sign in: ', err);
	// 	});
	// }

	render() {
		if (this.state.isLoading) return null;
		let loggedIn = false;
		if (this.state.user.username) {
			loggedIn = true;
		}
		if (loggedIn) {
			return (
				<Nav />
			);
		}
		return (
			<Tabs />
		);
		// return (
		// 	<View style={styles.container}>
		// 		<Button
		// 			title='Sign Up'
		// 			onPress={this.signUp.bind(this)}
		// 		/>
		// 		<TextInput
		// 			style={styles.input}
		// 			onChangeText={value => this.onChangeText(value)}
		// 		/>
		// 		<Button
		// 			title='Verify'
		// 			onPress={this.confirmUser.bind(this)}
		// 		/>
		// 	</View>
		// );
	}
}

// const styles = StyleSheet.create({
// 	input: {
// 		height: 50,
// 		backgroundColor: '#ededed',
// 		marginVertical: 10
// 	},
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		backgroundColor: '#f5fcff'
// 	}
// });

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(App);
