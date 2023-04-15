import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import configureStore from './Store/configureStore';
import { Provider } from 'react-redux'
const store=configureStore()
store.subscribe(()=>{
  console.log('store updated',store.getState())
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>)