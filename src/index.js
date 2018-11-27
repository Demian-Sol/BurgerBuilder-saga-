import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ingredientsReducer from './store/reducers/ingredients';
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
import { watchForSagas } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;


const rootReducer = combineReducers({
  ingrs: ingredientsReducer,
  ordrs: ordersReducer,
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk, sagaMiddleware) ) );

sagaMiddleware.run(watchForSagas);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
