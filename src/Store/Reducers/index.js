import { combineReducers } from 'redux';
import videoReducer from './videoReducer.js';
import userReducer from './userReducer.js';

const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer,
})

export default rootReducer;