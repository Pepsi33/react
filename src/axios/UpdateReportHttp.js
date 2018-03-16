import axios from 'axios';
import BaseModule from './BaseModule';
import { UpdateReportRqUrl as  RqUrl } from "./RequestUrl";
import { message } from 'antd';

class UpdateReportHttp extends BaseModule {
    //获取基础表单信息
    queryOne(rptid){
        return this.post(RqUrl.QueryOne, { rptid: rptid });
    }
    //获取参数配置数据
    getRptPmsDtl(params={}){
        return this.post(RqUrl.GetRptPmsDtl, {
            search: false,
            limit: 10,
            pageNo: 1,
            ...params
        });
    }
    getBaseDate(params, callback){
        this.all([
            this.queryOne(params["sp[rptid]"]),
            this.getRptPmsDtl(params)
        ]).then(axios.spread(callback))
    }
    //.rpx文件下载
    downloadFileRpx(params){
        this.post(RqUrl.DownloadFileRpx,params).then((res)=>{
            if(res.status===200&&res.data) return;
            message.error("下载失败")
        }).catch(err=>console.error(err));
    }
    //*_arg.rpx文件下载
    downloadFileArgRpx(params) {
        this.post(RqUrl.DownloadFileArgRpx, params).then((res) => {
            if (res.status === 200 && res.data) return;
            message.error("下载失败")
        }).catch(err => console.error(err));
    }
    uploadRpxFile(params) {
        let formData = new FormData();
        formData.append('file', params.file.originFileObj, params.file.name);
        formData.append('datasource', params.reportInfo.datasource);
        formData.append('reptKey', '');
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        return this.post(RqUrl.UploadRpxFile, formData, config);
    }
    //提交新增报表
    submitReport(params) {
        if(!params.file){
            this.UpdateReport(params);
            return;
        }

        this.uploadRpxFile(params).then((res) => {
            let code = res.data.code;
            if (code === "0") {
                this.UpdateReport(params);
            }
        }).catch(err => console.error(err));

    }
    //保存
    UpdateReport(params){
        const postData = {
            reportVo: JSON.stringify(params.reportInfo),
            reportDetails: JSON.stringify(params.dataSource.map(d => {
                delete d.key;
                delete d.editable;
                return { ...d };
            }))
        };

        this.post(RqUrl.UpdateReport, postData).then((res) => {
            let code = res.data.code;
            console.log(res)
            if (code === '0') {
                message.success("更新报表成功!");
                window.close();
            }
        }).catch(err => console.error(err));
    }
    //删除报表参数配置参数
    deleteParam(params){
        return this.post(RqUrl.DeleteParam, params)
    }
    
}

export default new UpdateReportHttp();