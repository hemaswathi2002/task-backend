const mongoose = require('mongoose')
const configureDb = async()=>{
    try{
        const response = await mongoose.connect('mongodb://127.0.0.1:27017/employee-details')
        console.log('Connected to db')
    }
    catch(err){
        console.log('Error connecting to db',err)
    }
}

module.exports = configureDb