import {createStore} from 'redux';
import appReducer from 'reducers';
// TODO: add middleware to reset state if grid changes
export default createStore(appReducer);
