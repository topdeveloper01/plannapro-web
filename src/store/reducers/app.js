import { ACTION_TYPES } from '../../constants';
import { OrderType_Delivery, VSort_Title } from '../../constants/config';

const initialState = {
  isLoggedIn: false,
  isSidebarOpened: false,
  headerClass: false,
  user: {},
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.APP_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case ACTION_TYPES.APP_SET_USER_DATA:
      return { ...state, user: action.payload };
    case ACTION_TYPES.APP_TOGGLE_SIDE_BAR:
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    case ACTION_TYPES.APP_SET_HEADER_CLASS:
      return { ...state, headerClass: action.payload || false };
    default:
      return state;
  }
};

export default app;
