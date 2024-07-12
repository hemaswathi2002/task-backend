const Employee = require('../Models/employee-model')
const {validationResult} = require('express-validator')
employeeCntlr = {}

employeeCntlr.register = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {body,file} = req
        const employee = new Employee(body)
        employee.image = file?.filename
        console.log(employee.image)
        const employeeResponse = await employee.save()
        res.status(201).json(employeeResponse)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
}

employeeCntlr.list = async(req,res) =>{
    try{
        const employee = await Employee.find()
        res.status(200).json(employee)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
}

employeeCntlr.destroy = async(req,res)=>{
    try{
        const id = req.params.id
        const employee = await Employee.findByIdAndDelete(id)
        res.status(200).json(employee)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
}

employeeCntlr.update = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const {body,file} = req
        const updateData = { ...body }
        if (file) {
            updateData.image = file?.filename
        }
        const employee = await Employee.findByIdAndUpdate(id,updateData,{new:true})
        res.status(200).json(employee)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = employeeCntlr