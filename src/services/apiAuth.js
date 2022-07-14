import { ApiFactory } from './index';
const API_LIST = {
  getLoggedInUserData: 'users',
  emailLogin: 'login',
  register: 'register',
  updateProfile: 'users',
  changePass: 'users'
};

const AuthService = {
  getLoggedInUserData() {
    return ApiFactory.get(API_LIST.getLoggedInUserData);
  },
  emailLogin(params) {
    return ApiFactory.post(API_LIST.emailLogin, params);
  },
  register(params) {
    return ApiFactory.post(API_LIST.register, params);
  },
  updateProfile(params) {
    return ApiFactory.put(API_LIST.updateProfile, params);
  },
  changePass(params) {
    return ApiFactory.put(API_LIST.changePass, params);
  }
};

export default AuthService;
