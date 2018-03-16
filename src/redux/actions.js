
import * as type from './constants/ActionTypes';

export const login = (data,id) => ({
  type: type.USER_LOGIN,
  data,
  id
});

export const layout = () => ({
  type: type.USER_LAYOUT
});




//报表参数数据
export const setRptParamsData = (data,id) => ({
  type: type.RPT_PAM_DATA_SET,
  data,
  id
});

export const getRptParamsData = () => ({
  type: type.RPT_PAM_DATA_GET
}); 




