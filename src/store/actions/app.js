import { ACTION_TYPES } from '../../constants';
import apiFactory from '../../services/apiFactory';

export const toggleSideBar = (payload) => {
  return { type: ACTION_TYPES.APP_TOGGLE_SIDE_BAR, payload: payload };
};

export const setAppHeaderClass = (payload) => {
  return { type: ACTION_TYPES.APP_SET_HEADER_CLASS, payload: payload };
};

export const setOrderMessageTags = () => (dispatch, getState) => {
  return new Promise((resolve) => {
    apiFactory.get(`orders/get-support-tags`).then(({ data }) => {
      let tags = data.tags || [];
      if (getState().app.language === 'en') {
        tags = tags.map((t) => ({ id: t.id, title: t.title_en }));
      } else {
        tags = tags.map((t) => ({ id: t.id, title: t.title_sq }));
      }

      dispatch({
        type: ACTION_TYPES.APP_SET_ORDER_MSG_TAGS,
        payload: tags
      });
      resolve();
    }, resolve);
  });
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
