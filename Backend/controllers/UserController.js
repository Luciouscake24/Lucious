import User from "../models/UserModel.js";

export const getUsers = async (req,res)=>{

try{

const users = await User.find().select("-password");

res.json({
success:true,
users
});

}catch(err){

res.status(500).json({
success:false,
message:"Server error"
});

}

};