/**
 *  报表订阅
 */


const initStates = {
    RptPmData: {},
    selectDate:[]
}


export const ReportS = (state = initStates, action) => {
    switch (action.type) {
        case 'RPT_PAM_DATA_SET':
            state.RptPmData[action.id] = action.data;
            break;
        case 'RPT_PAM_DATA_GET':
            return state.RptPmData;
        case 'SELECT_DATA_SET':
            state.selectDate = action.data;
            return state;
        default:
            return state;
    }
}



