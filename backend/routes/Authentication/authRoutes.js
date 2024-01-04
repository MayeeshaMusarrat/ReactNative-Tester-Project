const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const { loginValidationForUser } = require('./authValidation/loginValidationForUser');
const { signupValidationForUser } = require('./authValidation/signupValidationForUser');
const { generateHashPasswordForUser } = require('./hashPasswords/generateHashPassword');
const { compareHashPasswordOfUser } = require('./hashPasswords/compareHashPassword');

/**** 
 *  Joi signup and login schemas check the validation of the variables.
 *  password field usage method:
 *  const validationResult = signupValidationSchema.validate({ username: 'mai', email: 'mai18@gmail.com', password: 'M@yeesha123!' });
        if (validationResult.error) 
        {
        console.error(validationResult.error.message);
        } 
        else 
        {
        console.log('Password is valid!');
        }
 *****/

router.route ('/signup').post(async (req,res) => {
    
    const { username, email, password } = req.body;
    try 
    {
        const validateUserData = signupValidationForUser({ username, email, password });
        if (validateUserData.error)
        {
            //send 404 status
        }
        //! === What if the username/email already exist? Handle the case ===

        ///Hash the user password
        hashedPasswordForUser = generateHashPasswordForUser(password);

        //create new user object
        const newUser = {
            username,
            email,
            password: hashedPasswordForUser
        };
    }
    catch (error) 
    {

    }
    
    //save newUser data on the database
    newUser.save()
    .then(data => {
        console.log("New user has been added.");
    })
    .catch(error => {
        res.status(400).json({ error: err.message });
    })
})


module.exports = router