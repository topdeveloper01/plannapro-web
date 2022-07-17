import { ACTION_TYPES } from '../../constants';

export const toggleSideBar = (payload) => {
  return { type: ACTION_TYPES.APP_TOGGLE_SIDE_BAR, payload: payload };
};

export const setAppHeaderClass = (payload) => {
  return { type: ACTION_TYPES.APP_SET_HEADER_CLASS, payload: payload };
};

export const setPickedSlots = (payload) => {
  return { type: ACTION_TYPES.APP_SET_PICKED_SLOTS, payload: payload };
};

export const setHomeVendorFilter = (payload) => async (dispatch) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      await dispatch({
        type: ACTION_TYPES.APP_SET_VENDOR_FILTER,
        payload: payload
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
