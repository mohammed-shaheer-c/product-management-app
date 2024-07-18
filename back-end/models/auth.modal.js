const bcrypt = require('bcrypt');
const UserSchema = require('../mongo/schemas/user.schema')

module.exports = class users
{
    // Register modal
    static async signup(requestBody, response)
    {
        try
        {
           const {txtName, txtEmail,txtPassWord} = requestBody;
           let isEmailExist = await UserSchema.find({email : txtEmail})
           if(isEmailExist.length !== 0){
            console.log("hello ");
                return false;
           }

            // Hash the password
            const hashedPassword = await bcrypt.hash(txtPassWord, 10);

            // Create a new user
            const newUser = new UserSchema({
                name: txtName,
                email: txtEmail,
                password: hashedPassword,
            });

            // Save the user to the database   
            await newUser.save();

            return true

        }
        catch(error)
        {
            console.log("eroor",error.message);
        }
    };
    // login modal
    static async signin(requestBody) {
        try {
            const { txtEmail, txtPassWord } = requestBody;

            // Find user by email
            const user = await UserSchema.findOne({ email: txtEmail });
            if (!user) {
                return { status: false, message: 'Email not found.' };
            }

            // Compare passwords
            const passwordMatch = await bcrypt.compare(txtPassWord, user.password);
            if (!passwordMatch) {
                return { status: false, message: 'Invalid password.' };
            }

            // Password is correct, return success
            return { status: true, message: 'Successfully logged in.' };

        } catch (error) {
            console.error('Signin error:', error.message);
            throw error;
        }
    }
};



