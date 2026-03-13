import { useEffect, useState } from "react";
import axios from "axios";
import "./AddCollections.css";

const AddCollections = () => {

  const [collections,setCollections] = useState([]);
  const [categories,setCategories] = useState([]);

  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");
  const [categoryIds,setCategoryIds] = useState([]);
  const [image,setImage] = useState(null);

  const [message,setMessage] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const API = "http://localhost:5000/api/meta/collection";

  /* FETCH DATA */

  const fetchCollections = async ()=>{
    const res = await axios.get(API);
    setCollections(res.data);
  };

  const fetchCategories = async ()=>{
    const res = await axios.get(
      "http://localhost:5000/api/meta/category"
    );
    setCategories(res.data);
  };

  useEffect(()=>{
    fetchCollections();
    fetchCategories();
  },[]);

  /* TOGGLE CATEGORY */

  const toggleCategory = (id)=>{

    if(categoryIds.includes(id)){
      setCategoryIds(
        categoryIds.filter(c=>c!==id)
      );
    }else{
      setCategoryIds([...categoryIds,id]);
    }

  };

  /* ADD COLLECTION */

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try{

      const formData = new FormData();

      formData.append("name",name);
      formData.append("slug",slug);

      formData.append(
        "categoryIds",
        categoryIds.join(",")
      );

      formData.append("image",image);

      await axios.post(API,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      setMessage("✅ Collection added successfully");

      setName("");
      setSlug("");
      setCategoryIds([]);
      setImage(null);

      fetchCollections();

    }catch(err){

      setError(
        err.response?.data?.message ||
        "❌ Failed to add collection"
      );

    }

    setLoading(false);
  };

  /* DELETE */

  const deleteCollection = async(id)=>{

    if(!window.confirm("Delete this collection?")) return;

    await axios.delete(`${API}/${id}`);

    setMessage("🗑 Collection deleted");

    fetchCollections();

  };

  return (

    <div className="admin-page">

      <h1>Collections</h1>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="success-msg">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div className="error-msg">
          {error}
        </div>
      )}

      {/* ADD FORM */}

      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >

        <input
          placeholder="Collection Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          placeholder="Slug (pinata)"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
          required
        />

        {/* CATEGORY CHECKBOXES */}

        <div className="category-box">

          <p>Select Categories</p>

          {categories.map(cat=>(

            <label key={cat._id}>

              <input
                type="checkbox"
                checked={categoryIds.includes(cat._id)}
                onChange={()=>toggleCategory(cat._id)}
              />

              {cat.name}

            </label>

          ))}

        </div>

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
          required
        />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Collection"}
        </button>

      </form>

      {/* LIST */}

      <div className="grid">

        {collections.map(col=>(

          <div
            key={col._id}
            className="card"
          >

            <img
              src={`http://localhost:5000/${col.image}`}
              alt=""
            />

            <h3>{col.name}</h3>

            <p>
              Categories:
              {col.categoryIds?.map(id=>{
                const cat = categories.find(
                  c=>c._id===id
                );
                return cat?.name;
              }).join(", ")}
            </p>

            <button
              onClick={()=>deleteCollection(col._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default AddCollections;
