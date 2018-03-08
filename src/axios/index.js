
import BaseModule from './BaseModule';
import RequestUrl from "./RequestUrl";

class Http extends BaseModule{
    constructor(){
        super()
    }
    //报表中心报表订阅审核数据
    getRpqueueAuditingList(params = {}){
        return this.post(RequestUrl.RpqueueAuditingList, {
            search: false,
            limit: 10,
            pageNo: 1,
            ...params
        });
    }
    //报表推送
    pushReport(schid){
        return this.post(RequestUrl.ReportsPush,{
            schid: schid
        })
    }
    //启动或取消自动推送
    autoPushOrCancel(params){
        return this.post(RequestUrl.pushOrCancelAutoPush, {
            schid: params.schid === "1"?"0":"1",
            stat: params.stat,
            schtype:"0"
        })
    }


    /* 报表配置部分 */
    //报表中心报表管理数据
    getReportManagerList(params = {}){
        return this.post(RequestUrl.ReportManagerList, {
            search: false,
            limit: 10,
            pageNo: 1,
            ...params
        });
    }
    //删除报表
    deleteReport(rptid){
        return this.post(RequestUrl.DeleteReport, {
            rptid: rptid
        })
    }
}

export default new Http()