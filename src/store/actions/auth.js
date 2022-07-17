import { ACTION_TYPES } from '../../constants';

export const setAsLoggedIn = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: ACTION_TYPES.APP_LOGGED_IN,
        payload: true
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

