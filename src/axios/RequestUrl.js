/**
 *  请求路径管理
 */

export const UserRqUrl = {
    UserLogin:'/reportcenter/index/login.do'
}

export const RpUrl = {
    /* 报表订阅队列审核 */
    RpqueueAuditingList:'/reportcenter/reportRpqueue/reportRpqueueAuditingListPage.do',     //获取订阅数据
    ReportsPush:'/reportcenter/reportRpqueue/reportsPushNew.do',                            //报表推送
    PushOrCancelAutoPush:'/reportcenter/reportRpqueue/cancelReportverify.do',               //启动或取消自动推送

    /* 报表配置 */
    ReportManagerList:'/reportcenter/report/reportListPage.do',                             //获取全部数据
    GetReportSubStatus: '/reportcenter/reportRpqueue/getRpqueueByReportId.do',              //查看订阅状态
    DeleteReport:'/reportcenter/report/updateReportStarByRptid.do'                          //删除
}

export const AddReportRqUrl = {
    GetRpxParams: '/reportcenter/report/getRpxTest.do',                                     //获取参数
    GetDataSource:'/reportcenter//report/getFilePath.do',                                   //获取数据源选项
    UploadRpxFile:'/reportcenter/report/uploadReportFile.do',                               //上传
    SaveReport:'/reportcenter/report/saveReport.do'                                         //保存报表

    
}

export const UpdateReportRqUrl = {
    DownloadFileRpx: '/reportcenter/report/downloadFile.do',                                //下载*_arg.rpx文件
    DownloadFileArgRpx: '/reportcenter/report/downloadFilerpx.do',                          //下载*_arg.rpx文件
    QueryOne:'/reportcenter/report/queryOne.do',                                            //根据rptid获取报表基础详情
    UpdAttach: '/reportcenter/report/updAttach.do',
    DeleteParam:'/reportcenter/report/delReportDetails.do',                                 //删除报表参数配置参数
    UploadRpxFile: '/reportcenter/report/uploadReportFile.do',                              //上传文件
    UpdateReport:'/reportcenter/report/updateReport.do',                                    //更新
    GetRptPmsDtl:'/reportcenter//report/getReportDetail.do'                                 //获取报表参数配置
}