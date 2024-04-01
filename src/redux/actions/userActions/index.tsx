import userActionTypes from "./userActionTypes";

export function addUser(email: string) {
    return {
      type: userActionTypes.ADD_USER,
      info: 'Add expense in wallet',
      email,
    };
  }