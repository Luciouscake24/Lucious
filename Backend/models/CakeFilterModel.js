import mongoose from "mongoose";

const cakeFilterSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },

  slug:{
    type:String,
    required:true,
    unique:true
  },

  icon:{
    type:String,
    default:"CakeSlice"
  }

},{timestamps:true});

const CakeFilter = mongoose.model("CakeFilter",cakeFilterSchema);

export default CakeFilter;