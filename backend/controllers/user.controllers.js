const User= require ("../models/User");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerErrors}=require("../utils/errorsutils")

require("dotenv").config({path :"./config/.env"})

const secretOrKey = process.env.secretOrKey;



exports.register = async (req, res,next) => {
    const user = { ...req.body }
    const email = user.email
    const searchRes = await User.findOne({ email })

    if (searchRes) return res.status(403).json({ msg: "Email already exist" })

    try {
        const newUser = await new User({ ...user })

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newUser.password, salt)

        newUser.password = hash

        await newUser.save()
        res.status(200).json({ msg: "User added successfuly" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: "User register failed" })
    }

}

exports.login = async (req,res)=>{
    const { email , password} = req.body;

    const user = await User.findOne({ email});

    if(!user) return res.status(400).json({msg :"Wrong email or password"})

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return res.status(400).json({msg:"Wrong password"})

    if(user && !isMatch) return res.status(400).json({msg:"required field password"})


    try {
        const payload ={

            pseudo: user.pseudo,

            email:user.email,
            id: user._id
        }
        const token = await jwt.sign(payload,secretOrKey);
        res.status(200).json({ token: `Bearer ${token}` })

    } catch (error) {
        console.log("Login error",error);
        res.status(500).json({msg:"login fail"});
    }


}

exports.resetPassword=async(req,res)=>{

}