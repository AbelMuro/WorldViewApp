import { combineReducers } from 'redux';
import videoReducer from './videoReducer.js';

const rootReducer = combineReducers({
    video: videoReducer,
})

export default rootReducer;