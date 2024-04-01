// Esse reducer será responsável por tratar as informações da pessoa usuária
import ActionType from '../../actions/walletActions/walletActionTypes';
import userInitialState from './userInitialState';

type Action = {
  type: string;  
  email: string;
}

export default function userReducer(prevState = userInitialState, action: Action ) {
  switch (action.type) {
  case ActionType.ADD_USER:
    return {
      ...prevState,
      email: action.email,
    };
  default:
    return prevState;
  }
}
