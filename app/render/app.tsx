import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './app.less'
// 👇 引入 store
import store from './store';

// 引入 Provider
import { Provider } from 'react-redux';



const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
    
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
