import BaseModule from './BaseModule';
import { RptSubcibeRqUrl as RqUrl } from "./RequestUrl";
import { message } from 'antd';

class RptSubcibeHttp extends BaseModule {
    //获取参数配置数据
    getRptPmsDtl(params = {}) {
        return this.post(RqUrl.GetRptPmsDtl, params);
    }
    //删除报表参数配置参数
    deleteParam(params) {
        return this.post(RqUrl.DeleteParam, params)
    }

}

export default new RptSubcibeHttp();