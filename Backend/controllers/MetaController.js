export const createItem = (Model) => async (req,res) => {

  try{

    const data = { ...req.body };

    /* AUTO SLUG */

    if(data.name && !data.slug){
      data.slug = data.name
        .toLowerCase()
        .replace(/\s+/g,"-")
        .replace(/[^\w-]+/g,"");
    }

    /* MULTI CATEGORY FIX */

    if(data.categoryIds){
      data.categoryIds = data.categoryIds.split(",");
    }

    if(req.file){
      data.image = req.file.path;
    }

    const item = new Model(data);

    await item.save();

    res.json({
      success:true,
      item
    });

  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};


export const getItems = (Model) => async (req,res) => {

  try{

    const items = await Model
      .find()
      .sort({createdAt:-1})
      .lean();

    res.json(items);

  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};


export const deleteItem = (Model) => async (req,res) => {

  try{

    await Model.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success:true
    });

  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};