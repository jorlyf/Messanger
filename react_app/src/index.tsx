import ReactDOM from "react-dom";

import { createStore, Store } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import { RootReducer } from "./redux/Root";

import App from "./App";
import "./Main.css";

const store: Store = createStore(RootReducer, composeWithDevTools(

));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);