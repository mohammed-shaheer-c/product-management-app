const authModal = require('../models/auth.modal')
exports.userRegister = async(req, res)=>
    {
        try{
            let response = await authModal.signup(req.body);
            console.log(response);
            if(response){
                return res.status(200).send
                ({
                    status : true,
                    code : 200,
                    message : 'Success fully registered.',
                });  
            }else{
                return res.status(200).send
                ({
                    status : false,
                    code : 400,
                    message : 'Email allready exist.'
                });
            }
        }catch(error){
            return res.status(200).send
            ({
                status : false,
                code : 500,
                message : 'Internal server error.'
            });
        }

};

exports.userLogin = async(req, res)=>
    {
        try {
            const response = await authModal.signin(req.body);
    
            if (response.status) {
                return res.status(200).send({
                    status: true,
                    code: 200,
                    message: response.message,
                });
            } else {
                return res.status(200).send({
                    status: false,
                    code: 400,
                    message: response.message,
                });
            }
        } catch (error) {
            console.error('Login error:', error.message);
            return res.status(500).send({
                status: false,
                code: 500,
                message: 'Internal server error.',
            });
        }
};