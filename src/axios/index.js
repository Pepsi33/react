
import BaseModule from './BaseModule';
import RequestUrl from "./RequestUrl";

class Http extends BaseModule{
    constructor(){
        super()
    }
    getReportList(params = {}){
        return this.post(RequestUrl.RpqueueAuditingList, {
            search: false,
            limit: 10,
            pageNo: 1,
            ...params
        });
    }
}

export default new Http()