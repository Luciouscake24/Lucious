import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

const ProductsList = () => {
  const [products,setProducts] = useState([]);

  // fetch products
  const fetchProducts = async ()=>{
    try{
      const res = await axios.get("http://localhost:5000/api/product/list");
      setProducts(res.data);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  // delete product
  const deleteProduct = async (id)=>{
    if(!window.confirm("Delete this product?")) return;

    try{
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
      fetchProducts(); // refresh list
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="admin-products">
      <h1>All Products 🎂</h1>

      <div className="product-grid">
        {products.map((p)=>(
          <div className="product-card" key={p._id}>
            <img src={p.image} alt="" />

            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <p>{p.categoryId} / {p.collectionId}</p>

            <button
              className="delete-btn"
              onClick={()=>deleteProduct(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;