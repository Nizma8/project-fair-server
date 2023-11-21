const mangooose = require("mongoose")
const validator = require('validator')
const userSchema = new mangooose.Schema({
    username:{
        type:String,
        required:[true,'username is requires']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:[true,'password is required'],
    
    },
    image:{
        type:String,
    },
    github:{
        type:String
    },
    linkedin:{
        type:String,
 }
})
const users = mangooose.model('users',userSchema)
module.exports=users