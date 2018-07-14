import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from "./reducers";

const middleware = applyMiddleware(thunk)

export default createStore(reducers, composeWithDevTools(middleware))