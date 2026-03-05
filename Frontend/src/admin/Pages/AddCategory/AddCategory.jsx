import { useEffect, useState } from "react";
import axios from "axios";
import "./AddCategory.css";

const AddCategory = () => {

  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");
  const [image,setImage] = useState(null);

  const API = "http://localhost:5000/api/meta/category";

  /* FETCH CATEGORIES */
  const fetchCategories = async ()=>{
    const res = await axios.get(API);
    setCategories(res.data);
  };

  useEffect(()=>{
    fetchCategories();
  },[]);

  /* ADD CATEGORY */
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("image", image);

    await axios.post(API, formData, {
      headers:{ "Content-Type":"multipart/form-data" }
    });

    setName("");
    setSlug("");
    setImage(null);
    fetchCategories();
  };

  /* DELETE */
  const deleteCategory = async(id)=>{
    await axios.delete(`${API}/${id}`);
    fetchCategories();
  };

  return (
    <div className="admin-page">
      <h1>Categories</h1>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Slug (birthday)"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
        />

        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

        <button>Add Category</button>
      </form>

      {/* LIST */}
      <div className="grid">
        {categories.map(cat=>(
          <div key={cat._id} className="card">
            <img src={cat.image} alt="" />
            <h3>{cat.name}</h3>
            <p>{cat.slug}</p>
            <button onClick={()=>deleteCategory(cat._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;