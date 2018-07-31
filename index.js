import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Amplify from 'aws-amplify';
import rootReducer from './src/reducers';
import config from './src/aws-exports';
import App from './src/App';
import { name as appName } from './app.json';

Amplify.configure(config);
const store = createStore(rootReducer, applyMiddleware(thunk));

const ReduxApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
