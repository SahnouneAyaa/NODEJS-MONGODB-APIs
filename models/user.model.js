const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


let schemaUser=mongoose.Schema({
    username:String,
    email:String,
    password:String
})

let url = 'mongoose://localhost/27017/university'



var user = mongoose.model('user', schemaUser)


exports.register=(username,email,password)=>{
    return Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
        
            return user.findOne ({email:email})

        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                rej('this email exists')
            }else{
                bcrypt.hash(password,10).then((hashedpassword)=>{
                    let user= new user({
                        username:username,
                        email:email,
                        password:password
                    })
                    user.save().then((user)=>{
                        mongoose.disconnect()
                        res(user)
                    }).catch((err)=>{
                        mongoose.disconnect()
                        rej(err)})
                })
            }
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}


var privateKey="ayaaya18"


exports.login=(email,password)=>{
    return Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
        
            return user.findOne ({email:email})

        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                rej('this email does not exist')
            }else{
                bcrypt.compare(user.password,password).then(()=>{
                    if(same){
                        let token = jwt.sign({id:user._id, username:user.username},privateKey,{
                           expiresIn:'1h'
                        })
                        mongoose.disconnect()
                        res(token)
                    }else{
                        mongoose.disconnect()
                        rej('invalid password')
                    }
                }).catch((err)=>{
                    mongoose.disconnect()
                    rej(err)
                })
            }
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}
