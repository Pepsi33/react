
import BaseModule from './BaseModule';
import { RpUrl as RequestUrl } from "./RequestUrl";

class RptManagerHttp extends BaseModule {
    /* 报表配置部分 */
    //报表中心报表管理数据
    getReportManagerList(params = {}) {
        return this.post(RequestUrl.ReportManagerList, {
            search: false,
            limit: 10,
            pageNo: 1,
            ...params
        });
    }
    //删除报表
    deleteReport(rptid) {
        return this.post(RequestUrl.DeleteReport, {
            rptid: rptid
        })
    }
}

export default new RptManagerHttp()