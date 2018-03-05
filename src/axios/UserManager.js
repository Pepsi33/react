
import BaseModule from './BaseModule';
import RequestUrl from "./RequestUrl";

class UserManager extends BaseModule{
    constructor(){
        super()
    }
    login(params){
        return this.post(RequestUrl.UserLogin, params);
    }
}

export default new UserManager()