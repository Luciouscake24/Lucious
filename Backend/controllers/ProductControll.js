import Product from "../models/ProductModel.js";

export const addProduct = async (req,res)=>{
  try{
    if(!req.file){
      return res.status(400).json({message:"Image not uploaded"});
    }

    const product = new Product({
      ...req.body,
      tags:req.body.tags?.split(","),
      image:req.file.path
    });

    await product.save();
    res.json({success:true,message:"Product Added"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({success:false,message:err.message});
  }
};

export const getProducts = async (req,res)=>{
  const products = await Product.find().sort({createdAt:-1});
  res.json(products);
};

export const deleteProduct = async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json({success:true});
};

export const getSingleProduct = async (req,res)=>{
  const product = await Product.findById(req.params.id);
  res.json(product);
};