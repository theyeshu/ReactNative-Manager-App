import { auth } from 'firebase';
import { sendError } from './Alert';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS } from '.';

export const emailChange = text => dispatch => dispatch({
  type: EMAIL_CHANGED, payload: text,
});
export const passwordChange = text => dispatch => dispatch({
  type: PASSWORD_CHANGED, payload: text,
});

export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    return dispatch({ type: LOGIN_USER_SUCCESS, payload: res.user });
  } catch ({ code, message }) {
    let error = message || 'Something went wrong!';
    if (code === 'auth/invalid-email') {
      error = 'Email is not valid!';
    } else if (code === 'auth/wrong-password') {
      error = 'Invalid password!';
    } else if (code === 'auth/user-not-found') {
      error = 'User not found!';
    }
    return sendError(error, dispatch);
  }
};
