import { combineReducers } from 'redux';
import UserInfo from './UserInfo';
import { ReportM } from './ReportManager';
import { ReportS } from './ReportSubcibe';

const reducers = combineReducers({
    UserInfo,
    ReportM,
    ReportS
});

export default reducers;