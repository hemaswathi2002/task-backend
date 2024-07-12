const User = require('../Models/user-model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')

userscntlr = {}

userscntlr.register = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
    const body = req.body
    const user = new User(body)
    const salt = await bcryptjs.genSalt()
    const encryptedPassword = await bcryptjs.hash(user.password,salt)
    user.password = encryptedPassword
    const userResponse = await user.save()
    res.status(201).json(userResponse)
    }
    catch(err){
        res.status(500).json({errors:'Internal Server Error'})
    }
}

userscntlr.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {body} = req
        const user = await User.findOne({username:body.username})
        if(!user){
            return res.status(404).json({errors:'Invalid email/password'})
        }
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if(!checkPassword){
            return res.status(404).json({errors:'Invalid email/password'})
        }   
        const tokenData = {
            id : user._id,
        }
        console.log(tokenData)
        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn : '7d'})
        res.json({token:token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

userscntlr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select({ password: 0 })
        console.log(user)
        res.json(user)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = userscntlr
