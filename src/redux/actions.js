import * as type from './constants/ActionTypes';

export const login = (data) => ({
    type: type.USER_LOGIN,
    data
});

export const layout = () => ({
    type: type.USER_LAYOUT
});




//报表参数数据
export const setRptParamsData = (data, id) => ({
    type: type.RPT_PAM_DATA_SET,
    data,
    id
});

export const getRptParamsData = () => ({
  type: type.RPT_PAM_DATA_GET
}); 


/***多报表订阅***/
//设置选中数据
export const setSelectedData = (data) => ({
  type: type.SELECT_DATA_SET,
  data
});

//删除选中数据
export const deleteSelectedData = (id) => ({
    type: type.SELECT_DATA_DEL,
    id
});

//更新表格单条数据
export const updateSelectedData = (value, key, property) => ({
    type: type.SELECT_DATA_UPDATE,
    value,
    key,
    property
});

//设置单条 参数数据
export const setSelectedPmData = (key, PmData) => ({
    type: type.RPT_PM_DATA_SET,
    key, 
    PmData
}); 

//设置单条 参数数据
export const getSelectedPmData = (key) => ({
    type: type.RPT_PM_DATA_GET,
    key
});

//更新参数数据
export const updateSelectedPmData = (key, PmData) => ({
    type: type.RPT_PM_DATA_UPTATE,
    key,
    PmData
});




