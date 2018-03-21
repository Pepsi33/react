/**
 *  报表订阅
 */
const setSelectedRows = (state,data) => {
    let { cacheSelectedRows } = state;
    let selectedRows = [];
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
        selectedRows
    }

}

const delSelectedRows = (state, key) => {
    state.selectedRowKeys = state.selectedRowKeys.filter(k=>k!==key);
    state.selectedRows = state.selectedRows.filter(item => item.key !== key);
}

const initStates = {
    RptPmData: {},
    selectedRowKeys:[],
    cacheSelectedRows:{},
    selectedRows:[]
}


export const ReportS = (state = initStates, action) => {
    switch (action.type) {
        case 'RPT_PAM_DATA_SET':
            state.RptPmData[action.id] = action.data;
            break;
        case 'RPT_PAM_DATA_GET':
            return state.RptPmData;
        case 'SELECT_DATA_SET':
            //state = setSelectedRows(state,action.data)
            state = action.data;
            return state;
        case 'SELECT_DATA_DEL':
            delSelectedRows(state,action.id);
            return state;
        default:
            return state;
    }
}



