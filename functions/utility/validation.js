const isEmpty = (string) => {
    if (string === '') return true;
    else return false;
}

const isEmail = (email) => {
    const regExEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (email.match(regExEmail)) return true;
    else return false;
}

exports.validateSignUpData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Email must not be empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email adress';
    } else if (isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Password must match';
    } else if (isEmpty(data.hanlde)) {
        errors.handle = 'Must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) { 
        errors.email = 'Must not be empty';
    } else if(isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}