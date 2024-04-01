import { combineReducers } from 'redux';
import user from './user/user';
import wallet from './wallet/wallet';

const reducer = combineReducers({ user, wallet });

export default reducer;
