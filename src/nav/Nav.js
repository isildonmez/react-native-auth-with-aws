import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './Home';

const routeConfig = {
	Home: { screen: Home },
};

const StackNav = createStackNavigator(routeConfig);

class Nav extends Component {
	render() {
		return (
			<StackNav />
		);
	}
}

export default Nav;
