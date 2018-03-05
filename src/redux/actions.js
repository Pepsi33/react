
import * as type from './constants/ActionTypes';

export const login = (data) => ({
  type: type.USER_LOGIN,
  data
});

export const layout = () => ({
  type: type.USER_LAYOUT
});

