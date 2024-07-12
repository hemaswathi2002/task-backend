const Employee = require("../Models/employee-model")

const employeeValidationSchema = {
    name:{
        notEmpty:{
            errorMessage: 'name should not be empty'
        }
    },
    email:{
        notEmpty:{
            errorMessage: 'email should not be empty'
        },
        custom : {
            options : (async(value)=>{
                const email = await Employee.findOne({email: value})
                if(!email){
                    return true
                } else {
                    throw new Error('Email already exists')
                }
            })
        }
    },
    mobile:{
        notEmpty:{
            errorMessage: 'mobile should not be empty'
        },isNumeric : {
            errorMessage : 'mobile should be a number type'
        },
        isLength : {
            options : {min:10,max:10},
            errorMessage : 'mobile number should have 10 digits'
        },
        custom : {
            options : async function (value) {
                const user = await Employee.findOne({mobile:value})
                if(!user){
                    return true
                }else{
                    throw new Error('number already exists')
                }
            }
        } , 
    },
    designation:{
        notEmpty:{
            errorMessage: 'designation should not be empty'
        }
    },
    gender:{
        notEmpty:{
            errorMessage: 'gender should not be empty'
        }
    },
    course:{
        notEmpty:{
            errorMessage: 'course should not be empty'
        }
    },
    // image : {
    //     notEmpty : {
    //         errorMessage : '* image should not be empty'
    //     },
    // },
}

module.exports = employeeValidationSchema