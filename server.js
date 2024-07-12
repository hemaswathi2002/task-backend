require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const {checkSchema} = require('express-validator')

app.use(cors())
app.use(express.json())

const {userRegisterValidationSchema, userLoginValidationSchema} = require('./App/Validations/users-validator')
const employeeValidationSchema = require('./App/Validations/employee-validator')

const configureDb = require('./config/configDb')
configureDb()

const usersCntlr = require('./App/Controllers/users-controllers')
const employeeCntlr = require('./App/Controllers/employee-controllers')

const {authenticateUser} = require('./App/Middlewares/auth')

const upload = require('./upload')


app.post('/api/register',checkSchema(userRegisterValidationSchema),usersCntlr.register)
app.post('/api/login',checkSchema(userLoginValidationSchema),usersCntlr.login)
app.get('/api/users/account',authenticateUser,userscntlr.account)

app.post('/api/employees',upload.single('image'),employeeCntlr.register)
app.get('/api/employees',employeeCntlr.list)
app.put('/api/employees/:id',upload.single('image'),employeeCntlr.update)
app.delete('/api/employees/:id',employeeCntlr.destroy)



app.listen(port,()=>{
    console.log(`App is successfully running on the ${port}`)
})