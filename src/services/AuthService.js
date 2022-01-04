import { httpRequest } from './../util/HttpHandler';
import { setAuthCookie } from './../util/authHelper';

const SIGN_IN_URI = '/auth/signin';
const SIGN_UP_URI = '/auth/signup';

class AuthService {    
    signIn(credential){
        return httpRequest(SIGN_IN_URI, 'POST', credential).then(res=>{
            if(res.status === 200){
                setAuthCookie(res.data.accessToken);  
                return true;              
            }
            return false;
        })
    }

    signUp(user){
        return httpRequest(SIGN_UP_URI, 'POST', user).then(res=> {
            return res.status === 200;
        });
    }
}

export default new AuthService()