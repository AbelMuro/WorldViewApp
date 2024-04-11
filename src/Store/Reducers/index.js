import { combineReducers } from 'redux';
import videoReducer from './videoReducer.js';
import loginReducer from './loginReducer.js';

const rootReducer = combineReducers({
    video: videoReducer,
    login: loginReducer,
})

export default rootReducer;