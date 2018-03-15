/**
 *  报表新增修改等
 */

import AddReportHttp from '../../axios/AddReportHttp';
import { message } from 'antd';


//设置用户登录信息
export const setRptParamsData = (state) => {
	
}



const initStates = {
	RptPmData:[],
	PmCacheData:[]
}

export const ReportM = (state = initStates, action) => {
  switch (action.type) {
		case 'RPT_PAM_DATA_SET':
		  	state.RptPmData = action.data;
			return state;
	  	case 'RPT_PAM_DATA_GET':
			return state.RptPmData;
		default:
			return state
  }
}

