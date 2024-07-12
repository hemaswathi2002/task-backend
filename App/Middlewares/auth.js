const jwt = require('jsonwebtoken')
const authenticateUser = (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:'Token is required'})
    }
    try{
        const tokenData = jwt.verify(token,process.env.JWT_SECRET)
        console.log(tokenData)
        req.user = {
            id : tokenData.id,
        }
        console.log(req.user)
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:err.message})
    }
}

module.exports = {authenticateUser}