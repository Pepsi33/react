/**
 *  报表订阅
 */
//设置数据
const setSelectedRows = (state,data) => {
    const {cacheSelectedRows} = state;
    const selectedRows = [];
    const selectedRowKeys = data.selectedRowKeys;
    for (let item of data.selectedRows) {
        if (!cacheSelectedRows[item.key]) {
            cacheSelectedRows[item.key] = item;
        }
    }

    for (let key of data.selectedRowKeys) {
        selectedRows.push(cacheSelectedRows[key]);
    }

    return {
        cacheSelectedRows,
        selectedRows,
        selectedRowKeys
    }

}

//删除
const delSelectedRows = (state, key) => {
    const { cacheSelectedRows } = state;
    delete cacheSelectedRows[key];
    const selectedRowKeys = state.selectedRowKeys.filter(k=>k!==key);
    const selectedRows = state.selectedRows.filter(item => item.key !== key);

    return {
        cacheSelectedRows,
        selectedRowKeys,
        selectedRows
    }
}

//更新表格数据
const updateSelectedRows = (state, actions) => {
    let { cacheSelectedRows, selectedRowKeys } = state;
    const selectedRows = [];
    cacheSelectedRows[actions.key][actions.property] = actions.value;
    for (let key of selectedRowKeys) {
        selectedRows.push(cacheSelectedRows[key]);
    }
    return {
        cacheSelectedRows,
        selectedRowKeys,
        selectedRows
    }
}

//设置参数数据
const setSelectedPmData = (state, actions) => {
    let { cacheSelectedRows, selectedRowKeys } = state;
    const selectedRows = [];
    const id = actions.key;
    cacheSelectedRows[actions.key]["reportRpqueueVo"] = actions.PmData;
    for (let key of selectedRowKeys) {
        selectedRows.push(cacheSelectedRows[key]);
    }
    return {
        cacheSelectedRows,
        selectedRowKeys,
        selectedRows,
        id
    }
}

//更新参数数据
const updateSelectedPmData = (state, actions) => {
    let { cacheSelectedRows, selectedRowKeys } = state;
    const selectedRows = [];
    cacheSelectedRows[actions.key]["reportRpqueueVo"] = actions.PmData;
    for (let key of selectedRowKeys) {
        selectedRows.push(cacheSelectedRows[key]);
    }
    return {
        cacheSelectedRows,
        selectedRowKeys,
        selectedRows
    }
}

//获取参数数据
const getPmDataByKey = (state, key) =>{
    let { cacheSelectedRows } = state;
    return cacheSelectedRows[key]["reportRpqueueVo"];
}

const getSelectedRowsByKeys = (state,keys) =>{
    let { cacheSelectedRows } = state;
    let selectedRows = [];
    for (let key of keys) {
        selectedRows.push(cacheSelectedRows[key]);
    }
    return selectedRows;
}

const initStates = {
    key:"",
    selectedRowKeys:[],
    cacheSelectedRows:{},
    selectedRows:[]
}


export const ReportS = (state = initStates, action) => {
    switch (action.type) {
        case 'RPT_PM_DATA_SET':
            console.log(action)
            state = setSelectedPmData(state, action);
            return state;
        case 'RPT_PM_DATA_GET':
            return getPmDataByKey(state,action.key);
        case 'RPT_PM_DATA_UPTATE':
            return state;
        case 'SELECT_DATA_SET':
            state = setSelectedRows(state,action.data);
            return state;
        case 'SELECT_DATA_DEL': 
            state = delSelectedRows(state, action.id);
            return state;
        case 'SELECT_DATA_UPDATE': 
            console.log(action)
            state = updateSelectedRows(state, action);
            return state;
        default:
            return state;
    }
}



