import { combineReducers } from 'redux';
import BadgesReducer from './reducer_badges';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
    badges: BadgesReducer,
    user: UserReducer 
});

export default rootReducer;