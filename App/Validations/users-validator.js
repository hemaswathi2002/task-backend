const User = require('../Models/user-model')
const userRegisterValidationSchema = {
    username:{
        notEmpty:{
            errorMessage: 'username should not be empty'
        },
    custom : {
        options : (async(value)=>{
            const user = await User.findOne({username:value})
            if(!user){
                return true
            } else {
                throw new Error('Username Already Exists')
            }
        })
    },trim:true

    },
    password : {
        notEmpty : {
            errorMessage : 'password should not be empty'
        },
        isStrongPassword:{
            minLength:8,
            minLowerCase:1,
            minUpperCase:1,
            minNumber:1,
            minSymbols:1,
            errorMessage:'Password must containt atleast 1-uppercase, 1-lowercase, 1-number, 1-symbols'
        },escape:true
    }
}

const userLoginValidationSchema = {
    username:{
        notEmpty:{
            errorMessage: 'username should not be empty'
        },
    trim:true
    },
    password : {
        notEmpty : {
            errorMessage : 'password should not be empty'
        },
        trim:true
}
}

module.exports = {userRegisterValidationSchema, userLoginValidationSchema}