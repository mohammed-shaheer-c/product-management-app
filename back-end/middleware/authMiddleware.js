const { hasOnlyNonSpaces,isvalidEmail } = require('../utility/apiCommenController')

// Middleware for verify user register request body
exports.verifyRegisterUser = (req, res, next) => {
    next()
};

// Middleware for verify user login request body
exports.verifyLoginUser = (req, res, next) => {
    next() 
};

// Email validation middleware
exports.userEmailValidation = async (req, res, next) => {
    const email = req.body.txtEmail;
    if (!email) {
        return res.status(200).send({
            code: 400,
            status: false,
            message: "Email is not present",
        });
    } else {
        if (hasOnlyNonSpaces(email)) {
            return res.status(200).send({
                code: 400,
                status: false,
                message: "Email contains spaces",
            });
        } else {
            if (!isvalidEmail(email)) {
                return res.status(200).send({
                    code: 400,
                    status: false,
                    message: "Email format is incorrect",
                });
            } else {
                // If the email is valid, proceed to the next middleware
                next();
            } 
        }
    }
};


// Middle ware for user name validation
exports.userNameValidation = async (req, res, next) => {
    const name = req.body.txtName;

    if (!name) {
        return res.status(200).send({
            code: 400,
            status: false,
            message: "Name is not present",
        });
    } else {
        if (hasOnlyNonSpaces(name)) {
            return res.status(200).send({
                code: 400,
                status: false,
                message: "Name contains leading or trailing spaces",
            });
        } else {
            // If the name is valid, proceed to the next middleware
            next();
        }
    }
};

// Middle ware for password validation
exports.userPasswordValidation = async (req, res, next) => {
    const password = req.body.txtPassWord;

    if (!password) {
        return res.status(200).send({
            code: 400,
            status: false,
            message: "Password is not present",
        });
    } else {
        if (hasOnlyNonSpaces(password)) {
            return res.status(200).send({
                code: 400,
                status: false,
                message: "Password contains leading or trailing spaces",
            });
        } else if (password.length < 8) {
            return res.status(200).send({
                code: 400,
                status: false,
                message: "Password must be at least 8 characters long",
            });
        } else {
            // If the password is valid, proceed to the next middleware
            next();
        }
    }
};
