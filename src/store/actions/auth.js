import AuthService from '../../services/apiAuth';
import { ApiFactory, Storage } from '../../services';
import { ACTION_TYPES } from '../../constants';
import { getWebPushToken } from '../../services/pushWeb';

const getLoggedInUserData = () => {
  return new Promise((resolve, reject) => {
    try {
      AuthService.getLoggedInUserData()
        .then((res) => {
          resolve(res.data.user);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const getLoggedInUser = () => (dispatch) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      const user = await getLoggedInUserData();
      dispatch({
        type: ACTION_TYPES.APP_SET_USER_DATA,
        payload: user
      });
      dispatch({
        type: ACTION_TYPES.APP_SET_HAS_VERIFIED_PHONE,
        payload: !!user['verified_by_mobile']
      });
      resolve(user);
    } catch (e) {
      resolve();
    }
  });
};

export const login =
  ({ email, password }) =>
    (dispatch) => {
      return new Promise((resolve, reject) => {
        try {
          const device = {
            token: '123'
          };
          AuthService.emailLogin({ email, password, device }).then(
            async (response) => {
              const { token, verified_by_mobile } = response.data;
              Storage.setAppToken(token);
              const user = await getLoggedInUserData();

              dispatch({
                type: ACTION_TYPES.APP_SET_USER_DATA,
                payload: user
              });
              dispatch({
                type: ACTION_TYPES.APP_SET_HAS_VERIFIED_PHONE,
                payload: !!verified_by_mobile
              });

              resolve(user);
            },
            async (e) => {
              reject(e);
            }
          );
        } catch (e) {
          reject(e);
        }
      });
    };

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



export const updateProfileDetails = (user) => async dispatch => {
  return new Promise((resolve, reject) => {
    AuthService.updateProfile({
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      gender: user.gender,
      birthday: user.birthday, 
    })
      .then(async ({ data }) => {
        await dispatch({
          type: ACTION_TYPES.APP_SET_USER_DATA,
          payload: data.user
        });
        resolve(data.user);
      }, reject);
  });
};

 
export const legacyLogin = (token) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const device = {
        token: getWebPushToken()
      };

      ApiFactory.post(
        'login/legacy',
        { device },
        {
          headers: {
            Authorization: token
          }
        }
      ).then(
        async (response) => {
          const { token, verified_by_mobile } = response.data;
          Storage.setAppToken(token);

          const user = await getLoggedInUserData();
          dispatch({
            type: ACTION_TYPES.APP_SET_USER_DATA,
            payload: user
          });
          dispatch({
            type: ACTION_TYPES.APP_SET_HAS_VERIFIED_PHONE,
            payload: !!verified_by_mobile
          });

          resolve(user);
        },
        async (e) => {
          reject(e);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const register = (user) => () => {
  return new Promise((resolve, reject) => {
    try {
      const device = { token: getWebPushToken() };
      AuthService.register({ ...user, device }).then(resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
};
 
export const logout = () => async (dispatch) => {
  try {
    await ApiFactory.get('logout');
    Storage.clearAppToken();
    dispatch({
      type: ACTION_TYPES.APP_LOGGED_IN,
      payload: false
    });
    dispatch({
      type: ACTION_TYPES.APP_SET_ADDRESSES,
      payload: []
    });
    dispatch({
      type: ACTION_TYPES.APP_SET_USER_DATA,
      payload: {}
    });
    return { data: '', status: 'OK' };
  } catch (e) {
    return { data: e, status: 'ERROR' };
  }
};
 