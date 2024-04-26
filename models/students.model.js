const mongoose= require('mongoose')
const joi = require('joi')


let schemaValidation=joi.object({
    fullname:joi.string()
    .alphanum()
    .required(),
    email:joi.string()
    .email()
    .required(),
    age:joi.number()
    .required()
})


let schemaStudent=mongoose.Schema({
    fullname:string,
    email:string,
    age:Number
})


var student=mongoose.model('student', schemaStudent)

var url = 'mongodb://localhost:27017/university'



exports.postStudent=(fullname,email,age)=>{
    return Promise((res,rej)=>{
        mongoose.connect(url).then(async()=>{

            let validation=await schemaValidation.validateAsync({fullname:fullname, email:email, age:age})

            if(validation.error){
                mongoose.disconnect()
                rej(validation.error.details.message)
            }

            let student= new student({
                fullname:fullname,
                email:email,
                age:age
            })
            student.save().then((doc)=>{
                mongoose.disconnect()
                res(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                rej(err)
            })
        }).catch((err)=>{
            rej(err)
        })
    })
}


exports.getStudent=()=>{

    return Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
        
            return student.find()

        }).then((doc)=>{
            mongoose.disconnect()
            res(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })

}


exports.getStudentById=(id)=>{

    return Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
        
            return student.findById(id)

        }).then((doc)=>{
            mongoose.disconnect()
            res(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })

}


exports.updateStudent=(fullname,email,age)=>{

    return Promise((res,rej)=>{
        mongoose.connect(url).then(async ()=>{

            let validation=await schemaValidation.validateAsync({fullname:fullname, email:email, age:age})

            if(validation.error){
                mongoose.disconnect()
                rej(validation.error.details.message)
            }
        
            return student.updateOne ({_id:id},{fullname:fullname,email:email,age:age})

        }).then((doc)=>{
            mongoose.disconnect()
            res(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
    
}

exports.deleteStudent=(id)=>{

    return Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
        
            return student.deleteOne ({_id:id})

        }).then((doc)=>{
            mongoose.disconnect()
            res(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}