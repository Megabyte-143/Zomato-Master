import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { Provider } from "react-redux";
import Store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

