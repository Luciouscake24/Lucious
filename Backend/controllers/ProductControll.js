
import Product from "../models/ProductModel.js";
import XLSX from "xlsx";

/* ================= ADD PRODUCT ================= */

export const addProduct = async (req,res)=>{
  try{

    if(!req.file){
      return res.status(400).json({message:"Image not uploaded"});
    }

    const product = new Product({
      ...req.body,
      tags: req.body.tags?.split(","),
      image: req.file.path
    });

    await product.save();

    res.json({
      success:true,
      message:"Product Added"
    });

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};


/* ================= GET ALL PRODUCTS ================= */

export const getProducts = async (req,res)=>{
  try{

    const products = await Product.find().sort({createdAt:-1});

    res.json(products);

  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
};


/* ================= GET SINGLE PRODUCT ================= */

export const getSingleProduct = async (req,res)=>{
  try{

    const product = await Product.findById(req.params.id);

    res.json(product);

  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
};


/* ================= DELETE PRODUCT ================= */

export const deleteProduct = async (req,res)=>{
  try{

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success:true
    });

  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
};


/* ================= IMPORT PRODUCTS FROM EXCEL ================= */

export const importProducts = async (req,res)=>{
  try{

    if(!req.file){
      return res.status(400).json({
        success:false,
        message:"Excel file not uploaded"
      });
    }

    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    for(const row of data){

      const product = new Product({
        name: row.name,
        price: row.price,
        categoryId: row.categoryId,
        collectionId: row.collectionId,
        occasionId: row.occasionId,
        flavour: row.flavour,
        diet: row.diet,
        cream: row.cream,
        weight: row.weight,
        tags: row.tags ? row.tags.split(",") : []
      });

      await product.save();
    }

    res.json({
      success:true,
      message:"Products imported successfully"
    });

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};
