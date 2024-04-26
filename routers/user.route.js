const { register } = require('module')

const route = require('express').Router


route.post('/register',(req,res,next)=>{
    register(req.body.username,req.body.email,req.body.password)
    .then((user)=>{res.status(200).json({user:user, msg:'added'})})
    .catch((err)=>{res.status(400).json(err)})
})


route.post('/login',(req,res,next)=>{
    register(req.body.username,req.body.email,req.body.password)
    .then((token)=>{res.status(200).json({token:token, msg:'login'})})
    .catch((err)=>{res.status(400).json(err)})
})

module.exports=route