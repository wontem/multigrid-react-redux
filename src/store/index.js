import {createStore, applyMiddleware} from 'redux';
import appReducer from 'reducers';
import resetTools from 'middleware/tools_middleware';

export default createStore(appReducer, applyMiddleware(resetTools));
