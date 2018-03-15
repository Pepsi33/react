
import BaseModule from './BaseModule';
import { UserRqUrl } from "./RequestUrl";

class UserManagerHttp extends BaseModule{
    login(params){
        return this.post(UserRqUrl.UserLogin, params);
    }
}

export const Http = new UserManagerHttp()