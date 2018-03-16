
import BaseModule from './BaseModule';
import { message } from 'antd';
import { AddReportRqUrl } from "./RequestUrl";

class AddReportHttp extends BaseModule {
    //获取数据源下拉选项
    getDataSource(params) {
        return this.post(AddReportRqUrl.GetDataSource, params);
    }
    //上传文件
    uploadRpxFile(params){
        let formData = new FormData();
        formData.append('file', params.file.originFileObj, params.file.name);
        formData.append('datasource', params.reportInfo.datasource); 
        formData.append('reptKey', '');
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        return this.post(AddReportRqUrl.UploadRpxFile, formData, config);
    }
    //提交新增报表
    submitReport(params){
        this.uploadRpxFile(params).then((res) => {
            let code = res.data.code;
            if (code === "0") {
                this.SaveReport(params);
            }
        }).catch(err => console.error(err));    
    }
    //保存
    SaveReport(params){
        const postData = {
                reportVo: JSON.stringify(params.reportInfo), 
                reportDetails: JSON.stringify(params.dataSource.map(d => {
                    delete d.key;
                    delete d.editable;
                    return { ...d }; 
                }))
            };

        this.post(AddReportRqUrl.SaveReport, postData).then((res) => {
            let code = res.data.code;
            console.log(res)
            if (code === '0') {
                message.success("新增报表成功!");
                window.close();
            }
        }).catch(err => console.error(err));
    }
}

export default new AddReportHttp();
