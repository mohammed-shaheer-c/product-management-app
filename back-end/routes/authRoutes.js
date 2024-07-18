const authMiddleware = require('../middleware/authMiddleware');
const authController  = require('../controllers/authController')

module.exports = function(app)
{

    // Register
    app.post('/auth/register',
    authMiddleware.userNameValidation,
    authMiddleware.userEmailValidation,
    authMiddleware.userPasswordValidation,
    authController.userRegister
    );

    // Login
    app.post('/auth/login',
    authMiddleware.userEmailValidation,
    authMiddleware.userPasswordValidation,
    authController.userLogin
    );
    
}