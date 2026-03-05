import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:String,
  slug:String
},{timestamps:true});

export default mongoose.model("Tag", schema);