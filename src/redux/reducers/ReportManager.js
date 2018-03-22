/**
 *  报表新增修改等
 */


const initStates = {
	RptPmData:{}
}


export const ReportM = (state = initStates, action) => {
  switch (action.type) {
		case 'RPT_PAM_DATA_SET':
		  state.RptPmData[action.id] = action.data;
			return state;
		case 'RPT_PAM_DATA_GET':
			return state.RptPmData;
		default:
			return state
  }
}



