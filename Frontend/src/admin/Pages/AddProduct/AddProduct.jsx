import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminForm.css";

const AddProduct = () => {

  const [imageFile,setImageFile] = useState(null);

  const [categories,setCategories] = useState([]);
  const [collections,setCollections] = useState([]);
  const [occasions,setOccasions] = useState([]);
  const [tags,setTags] = useState([]);

  const [form,setForm] = useState({
    name:"",
    price:"",
    categoryId:"",
    collectionId:"",
    occasionId:"",
    flavour:"",
    diet:"egg",
    cream:"",
    weight:"1kg",
    tags:[]
  });

  /* Fetch CMS Data */
  useEffect(()=>{
    axios.get("http://localhost:5000/api/meta/category")
      .then(res=>setCategories(res.data));

    axios.get("http://localhost:5000/api/meta/collection")
      .then(res=>setCollections(res.data));

    axios.get("http://localhost:5000/api/meta/occasion")
      .then(res=>setOccasions(res.data));

    axios.get("http://localhost:5000/api/meta/tag")
      .then(res=>setTags(res.data));
  },[]);

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const toggleTag = (slug)=>{
    if(form.tags.includes(slug)){
      setForm({...form,tags:form.tags.filter(t=>t!==slug)});
    }else{
      setForm({...form,tags:[...form.tags,slug]});
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      const formData = new FormData();

      Object.keys(form).forEach(key=>{
        if(key !== "tags"){
          formData.append(key, form[key]);
        }
      });

      formData.append("tags",form.tags.join(","));
      formData.append("image",imageFile);

      await axios.post(
        "http://localhost:5000/api/product/add",
        formData,
        {headers:{"Content-Type":"multipart/form-data"}}
      );

      alert("🎉 Product Added Successfully");

    }catch(err){
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="admin-page">

      <h1>Add New Cake 🎂</h1>

      <form className="admin-form" onSubmit={handleSubmit}>

        {/* BASIC INFO */}
        <h3>Basic Information</h3>

        <input
          name="name"
          placeholder="Cake Name"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        {/* WHERE CAKE APPEARS */}
        <h3>Where should this cake appear?</h3>

        <select name="categoryId" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(c=>(
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select name="collectionId" onChange={handleChange}>
          <option value="">Select Collection (optional)</option>
          {collections.map(c=>(
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select name="occasionId" onChange={handleChange}>
          <option value="">Select Occasion (optional)</option>
          {occasions.map(o=>(
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* CAKE DETAILS */}
        <h3>Cake Details</h3>

        <input
          name="flavour"
          placeholder="Flavour (Chocolate, Vanilla...)"
          onChange={handleChange}
        />

        <select name="diet" onChange={handleChange}>
          <option value="egg">Egg</option>
          <option value="eggless">Eggless</option>
        </select>

        <input
          name="cream"
          placeholder="Cream Type"
          onChange={handleChange}
        />

        <input
          name="weight"
          placeholder="Weight (500g, 1kg...)"
          onChange={handleChange}
        />

        {/* TAGS */}
        <h3>Tags</h3>

        <div className="tags-box">
          {tags.map(tag=>(
            <label key={tag._id}>
              <input
                type="checkbox"
                onChange={()=>toggleTag(tag.slug)}
              />
              {tag.name}
            </label>
          ))}
        </div>

        {/* IMAGE */}
        <h3>Upload Image</h3>

        <input
          type="file"
          onChange={(e)=>setImageFile(e.target.files[0])}
          required
        />

        <button type="submit">
          Add Cake
        </button>

      </form>

    </div>
  );
};

export default AddProduct;