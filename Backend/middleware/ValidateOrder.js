    const validateOrder = (req,res,next)=>{

      const { customer, items, total } = req.body;

      if(!customer || !items || !total){
        return res.status(400).json({
          success:false,
          message:"Invalid order data"
        });
      }

      if(items.length === 0){
        return res.status(400).json({
          success:false,
          message:"Cart is empty"
        });
      }

      next();
    };

    export default validateOrder;