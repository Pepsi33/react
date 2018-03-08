/**
 *  请求路径管理
 */
const RequestUrl = {
    UserLogin: '/reportcenter/index/login.do',

    /* 报表订阅队列审核 */
    RpqueueAuditingList:'/reportcenter/reportRpqueue/reportRpqueueAuditingListPage.do',     //获取订阅数据
    ReportsPush:'/reportcenter/reportRpqueue/reportsPushNew.do',                            //报表推送
    pushOrCancelAutoPush:'/reportcenter/reportRpqueue/cancelReportverify.do',               //启动或取消自动推送

    /* 报表配置 */
    ReportManagerList:'/reportcenter/report/reportListPage.do',                             //获取全部数据
    getReportSubStatus: '/reportcenter/reportRpqueue/getRpqueueByReportId.do',              //查看订阅状态
    DeleteReport:'/reportcenter/report/updateReportStarByRptid.do'                          //删除
}

export default RequestUrl