const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

function isStringInvalid(str){
    if(str == undefined || str.length === 0){
        return true
    }
    else{
        return false
    }
}


exports.addUser = async (req, res) => {
    console.log(req.body)
    try{
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    if(isStringInvalid(userName) || isStringInvalid(email) ||  isStringInvalid(password)){
        return res.status(400).json({err: "some parameters missing"})
    }

    const user = await User.findOne({where: {email: email}})
    if(user){
        return res.status(400).json({err: "User already Exists"})
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async(err, hash) => {
        console.log(err)
        await User.create({userName, email, password: hash})
        res.status(201).json({message: 'User created successfully'});
    })
    } catch(err){
        res.status(500).json({error: err})
    }
}



function generateAccessToken(id,name) {
    return jwt.sign({userId : id, userName: name},`${process.env.JWT_SECRET_KEY}`)
}



exports.login = async(req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        if(isStringInvalid(email) || isStringInvalid(password)){
            return res.status(400).json({message: 'Email or password is missing'})
        }

        const user = await User.findOne({ where:{email: email}})
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    throw new Error('Something went wrong')
                }
                if(result === true){
                    res.status(200).json({success: true, message: "User login successful", token: generateAccessToken(user.id, user.userName)})
                }
                else{
                    res.status(400).json({success: false, message: "Password Incorrect"})
                }
            })
            }
            else{
                res.status(404).json({success: false, message: "User not found"})
            }
        }
     catch(err){
        res.status(500).json({
            error: err 
        })
    }
}



exports.changePassword = async(req, res) => {
    try{
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword
        const user = await User.findOne({ where:{email: req.user.email}})
        bcrypt.compare(oldPassword, user.password, (err, result) => {
            if(err){
                throw new Error('Something went wrong')
            }
            if(result === true){
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    if(err){
                        console.log(err);
                        throw new Error(err);
                    }
                    bcrypt.hash(newPassword, salt, async function(err, hash) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        await user.update({password: hash})
                        res.status(201).json({message: 'password updated'})
                    })
                })
            }
        })
    }catch(err){
        res.status(500).json({error: err})
    }
}