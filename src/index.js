import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'hookompose';
import './index.css';
import '@ln613/css';
import App from './App';
import { cats } from './const';

ReactDOM.render(
  <React.StrictMode>
    <Provider initialValue={{ cats: cats.map(x => ({ cat: x[0], name: x[1], chs: [] })) }}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
