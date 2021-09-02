import React from 'react';

import firebase from 'firebase';
import Constants from 'expo-constants';
import Route from './src/navigation/main';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (firebase.apps.length === 0) {
  firebase.initializeApp(Constants.manifest.web.config.firebase);
}

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}