import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/configureStore'
import { Provider } from 'react-redux';
//apply index.css on all site
import  './utils/css/index.css' 
import App from './App';


ReactDOM.render(
<Provider store = {store}>
   <App />
</Provider>, document.getElementById('root')
);
