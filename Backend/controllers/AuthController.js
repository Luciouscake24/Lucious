import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* CREATE TOKEN */

const createToken = (id) => {
return jwt.sign(
{id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);
};

/* =========================
REGISTER USER
========================= */

export const registerUser = async(req,res)=>{
try{

let {name,email,password} = req.body;

/* validate */

if(!name || !email || !password){
return res.status(400).json({
success:false,
message:"All fields are required"
});
}

/* normalize email */

email = email.trim().toLowerCase();

/* check existing */

const exist = await User.findOne({email});

if(exist){
return res.status(400).json({
success:false,
message:"User already exists"
});
}

/* hash password */

const hashedPassword = await bcrypt.hash(password,10);

/* create user */

const user = await User.create({
name,
email,
password:hashedPassword
});

/* generate token */

const token = createToken(user._id);

/* response */

res.status(201).json({
success:true,
token,
user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
message:"Server error"
});

}
};

/* =========================
LOGIN USER
========================= */

export const loginUser = async(req,res)=>{
try{

let {email,password} = req.body;

/* validate */

if(!email || !password){
return res.status(400).json({
success:false,
message:"Email and password required"
});
}

/* normalize email */

email = email.trim().toLowerCase();

/* find user */

const user = await User.findOne({email});

if(!user){
return res.status(404).json({
success:false,
message:"User not found"
});
}

/* check password */

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.status(401).json({
success:false,
message:"Invalid password"
});
}

/* generate token */

const token = createToken(user._id);

/* response */

res.json({
success:true,
token,
user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
message:"Server error"
});

}
};