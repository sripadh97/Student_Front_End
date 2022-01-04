const emailValidater = (email) => {
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){// valid 
       return true;
    } else { // invalid 
        return false
    }
};

export default emailValidater;