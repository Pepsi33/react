
import BaseModule from './BaseModule';
import { RpUrl as RequestUrl } from "./RequestUrl";

class RptQueueHttp extends BaseModule {
    //报表中心报表订阅审核数据
    getRpqueueAuditingList(params = {}) {
        return this.post(RequestUrl.RpqueueAuditingList, {
            search: false,
            limit: 10,
            pageNo: 1,
            ...params
        });
    }
    //报表推送
    pushReport(schid) {
        return this.post(RequestUrl.ReportsPush, {
            schid: schid
        })
    }
    //启动或取消自动推送
    autoPushOrCancel(params) {
        return this.post(RequestUrl.PushOrCancelAutoPush, {
            schid: params.schid === "1" ? "0" : "1",
            stat: params.stat,
            schtype: "0"
        })
    }
}

export default new RptQueueHttp()