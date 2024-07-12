const mongoose = require('mongoose')
const {Schema, model} = mongoose

const employeeSchema = new Schema({
    name : String, 
    email : String,
    mobile : Number,
    userId : Schema.Types.ObjectId,
    designation : String,
    gender : {
        type : String, 
        enum : ['male','female']
    },
    course : {
        type : [String], 
        enum : ['MCA','BCA','BSC']
    },
    image : String
}, {timestamps : true})

const Employee = model('Employee',employeeSchema)

module.exports = Employee