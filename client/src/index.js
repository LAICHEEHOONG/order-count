import React from 'react';
import ReactDOM from 'react-dom';
import { MyProvider } from './context';
import App from './App';





ReactDOM.render(
  <React.StrictMode>

    <MyProvider>
      <App />
    </MyProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


