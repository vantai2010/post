const express = require('express');
const router = express.Router()
const argon2 = require('argon2')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

//check login GET api/auth
router.get('/', verifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password')
        if(!user) {
            return res.status(400).json({success: false, message: 'user not found'})
        }
        res.json({success: true, user})
    }catch(err){
        console.log(error)
        res.status(500).json({success:false, message: 'loi server lon ra roi'})
    }
})

// api/auth/register
router.post('/register', async (req,res) => {
    const { username , password } = req.body

    if(!username || !password){
        return res.status(404).json({success: false, message: 'missing username or password'});
    }

    try {
        const user = await User.findOne({username: username})
        if(user){
            return res.status(400).json({success: false, message: 'username already taken'})
        }   
        
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedPassword})
        await newUser.save()

        // return token
        // tao token chữ ký bằng id của thằng mới
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({success: true, message:'user created sucessfully',accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'loi server lon ra roi'})

    }   
})


// api/auth/login

router.post('/login', async (req,res) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.status(400).json({success: false, message: 'vui long nhap du thong tin'})
    }

    try {
        //check yuser co ton tai chua
        const user = await User.findOne({username: username})
        if(!user){
            return res.status(400).json({success: false, message: 'vui long nhap lai username or password '})        
        }
        //so sánh password
        const passwordValid = await argon2.verify(user.password, password)
        console.log(passwordValid)
        if(!passwordValid){
            return res.status(400).json({success: false, message: 'vui long nhap lai username or password'})
        }

        // all good
        
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message:'user login sucessfully',accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'loi server lon ra roi'})
    }
})


module.exports = router
