import axios from 'axios';
import i18n from 'i18next';
import { BrowserTypes, browserVersion, OsTypes, osVersion } from 'react-device-detect';
import { Config } from '../constants';
import { Storage } from './index';

const manufacturer = OsTypes;
const model = BrowserTypes;
const systemVersion = osVersion;
const appVersion = browserVersion;
const factory = new axios.create({
  timeout: 30000,
  baseURL: Config.API_BASE_URL,
  headers: {
    'App-Key': Config.APP_KEY,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'X-PLATFORM': Config.PLATFORM,
    'X-MANUFACTURER': manufacturer,
    'X-DEVICE-MODEL': model,
    'X-SYSTEM-VERSION': systemVersion,
    'X-APP-VERSION': appVersion,
    'X-UUID': Storage.getDeviceUniqueId()
  }
});

factory.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = i18n.language;
    try {
      const token = Storage.getAppToken();
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      //Not logged in
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

factory.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default factory;
