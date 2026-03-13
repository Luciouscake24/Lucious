import mongoose from "mongoose";

const schema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  slug:{
    type:String,
    required:true
  },

  /* MULTIPLE CATEGORY IDS */

  categoryIds:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category"
    }
  ],

  image:{
    type:String,
    required:true
  }

},{timestamps:true});

export default mongoose.model("Collection", schema);
