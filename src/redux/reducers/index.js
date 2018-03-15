import { combineReducers } from 'redux';
import UserInfo from './UserInfo';
import { ReportM } from './ReportManager';

const reducers = combineReducers({
    UserInfo,
    ReportM
});

export default reducers;