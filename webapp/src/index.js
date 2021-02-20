import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './elements/routes'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Routes />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

