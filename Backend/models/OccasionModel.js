import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:String,
  slug:String,
  image:String
},{timestamps:true});

export default mongoose.model("Occasion", schema);