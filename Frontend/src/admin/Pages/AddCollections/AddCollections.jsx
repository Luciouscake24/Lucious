import { useEffect, useState } from "react";
import axios from "axios";
import "./AddCollections.css";

const AddCollections = () => {

  const [collections,setCollections] = useState([]);
  const [categories,setCategories] = useState([]);

  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");
  const [categorySlug,setCategorySlug] = useState("");
  const [image,setImage] = useState(null);

  const API = "http://localhost:5000/api/meta/collection";

  /* FETCH DATA */
  const fetchCollections = async ()=>{
    const res = await axios.get(API);
    setCollections(res.data);
  };

  const fetchCategories = async ()=>{
    const res = await axios.get("http://localhost:5000/api/meta/category");
    setCategories(res.data);
  };

  useEffect(()=>{
    fetchCollections();
    fetchCategories();
  },[]);

  /* ADD COLLECTION */
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("categorySlug", categorySlug);
    formData.append("image", image);

    await axios.post(API, formData, {
      headers:{ "Content-Type":"multipart/form-data" }
    });

    setName("");
    setSlug("");
    setCategorySlug("");
    setImage(null);
    fetchCollections();
  };

  /* DELETE */
  const deleteCollection = async(id)=>{
    await axios.delete(`${API}/${id}`);
    fetchCollections();
  };

  return (
    <div className="admin-page">
      <h1>Collections</h1>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="admin-form">

        <input
          placeholder="Collection Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Slug (pinata)"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
        />

        {/* CATEGORY DROPDOWN */}
        <select
          value={categorySlug}
          onChange={(e)=>setCategorySlug(e.target.value)}
        >
          <option>Select Category</option>
          {categories.map(cat=>(
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

        <button>Add Collection</button>
      </form>

      {/* LIST */}
      <div className="grid">
        {collections.map(col=>(
          <div key={col._id} className="card">
            <img src={col.image} alt="" />
            <h3>{col.name}</h3>
            <p>Category: {col.categorySlug}</p>
            <button onClick={()=>deleteCollection(col._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCollections;