
import * as type from './constants/ActionTypes';

export const login = (data) => ({
  type: type.USER_LOGIN,
  data
});

export const layout = () => ({
  type: type.USER_LAYOUT
});




//报表参数数据
export const setRptParamsData = (data) => ({
  type: type.RPT_PAM_DATA_SET,
  data
});

export const getRptParamsData = () => ({
  type: type.RPT_PAM_DATA_GET
}); 


