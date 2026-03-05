import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminForm.css";

const AddProduct = () => {

  const [imageFile,setImageFile] = useState(null);

  /* CMS DATA */
  const [categories,setCategories] = useState([]);
  const [collections,setCollections] = useState([]);
  const [filteredCollections,setFilteredCollections] = useState([]);
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

  /* FETCH CMS DATA */
  useEffect(()=>{
    axios.get("http://localhost:5000/api/meta/category").then(res=>setCategories(res.data));
    axios.get("http://localhost:5000/api/meta/collection").then(res=>setCollections(res.data));
    axios.get("http://localhost:5000/api/meta/occasion").then(res=>setOccasions(res.data));
    axios.get("http://localhost:5000/api/meta/tag").then(res=>setTags(res.data));
  },[]);

  /* FILTER COLLECTION WHEN CATEGORY CHANGES */
  useEffect(()=>{
    const filtered = collections.filter(c=>c.categorySlug === form.categoryId);
    setFilteredCollections(filtered);
  },[form.categoryId, collections]);

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  /* MULTI TAG SELECT */
  const toggleTag = (slug)=>{
    if(form.tags.includes(slug)){
      setForm({...form, tags: form.tags.filter(t=>t!==slug)});
    } else {
      setForm({...form, tags:[...form.tags, slug]});
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

      formData.append("tags", form.tags.join(","));
      formData.append("image", imageFile);

      await axios.post(
        "http://localhost:5000/api/product/add",
        formData,
        { headers:{ "Content-Type":"multipart/form-data" } }
      );

      alert("🎉 Product Added Successfully");

    }catch(err){
      alert("Error adding product");
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Add New Cake 🎂</h1>

      <form className="admin-form" onSubmit={handleSubmit}>

        <input name="name" placeholder="Cake Name" onChange={handleChange}/>
        <input name="price" placeholder="Price" onChange={handleChange}/>

        {/* CATEGORY DROPDOWN */}
        <select name="categoryId" onChange={handleChange}>
          <option>Select Category</option>
          {categories.map(c=>(
            <option key={c._id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* COLLECTION DROPDOWN */}
        <select name="collectionId" onChange={handleChange}>
          <option>Select Collection</option>
          {filteredCollections.map(c=>(
            <option key={c._id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* OCCASION DROPDOWN */}
        <select name="occasionId" onChange={handleChange}>
          <option>Select Occasion</option>
          {occasions.map(o=>(
            <option key={o._id} value={o.slug}>{o.name}</option>
          ))}
        </select>

        <input name="flavour" placeholder="Flavour" onChange={handleChange}/>

        <select name="diet" onChange={handleChange}>
          <option value="egg">Egg</option>
          <option value="eggless">Eggless</option>
        </select>

        <input name="cream" placeholder="Cream" onChange={handleChange}/>
        <input name="weight" placeholder="Weight" onChange={handleChange}/>

        {/* TAGS MULTI SELECT */}
        <div className="tags-box">
          {tags.map(tag=>(
            <label key={tag._id}>
              <input type="checkbox" onChange={()=>toggleTag(tag.slug)} />
              {tag.name}
            </label>
          ))}
        </div>

        <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} />

        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;