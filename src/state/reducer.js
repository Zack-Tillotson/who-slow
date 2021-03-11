import {combineReducers} from 'redux';
import sessionConfig from './reducers/sessionConfig'

const rootReducer = combineReducers({
  sessionConfig,
});

export default rootReducer;