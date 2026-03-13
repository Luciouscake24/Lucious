
import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminForm.css";

const AddProduct = () => {

  const [imageFile,setImageFile] = useState(null);
  const [excelFile,setExcelFile] = useState(null);
  const [progress,setProgress] = useState(0);

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

  /* ================= FETCH CMS DATA ================= */

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

  /* ================= FORM CHANGE ================= */

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  /* ================= TAG TOGGLE ================= */

  const toggleTag = (slug)=>{
    if(form.tags.includes(slug)){
      setForm({...form,tags:form.tags.filter(t=>t!==slug)});
    }else{
      setForm({...form,tags:[...form.tags,slug]});
    }
  };

  /* ================= ADD PRODUCT ================= */

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

  /* ================= IMPORT EXCEL ================= */

  const handleExcelUpload = async ()=>{

    if(!excelFile){
      alert("Please select Excel file");
      return;
    }

    try{

      const formData = new FormData();
      formData.append("file",excelFile);

      await axios.post(
        "http://localhost:5000/api/product/import",
        formData,
        {
          headers:{"Content-Type":"multipart/form-data"},
          onUploadProgress:(progressEvent)=>{
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        }
      );

      alert("🎉 Products Imported Successfully");
      setProgress(0);

    }catch(err){
      console.log(err);
      alert("Excel import failed");
    }
  };

  /* ================= DRAG DROP ================= */

  const handleDrop = (e)=>{
    e.preventDefault();
    setExcelFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e)=>{
    e.preventDefault();
  };

  /* ================= DOWNLOAD TEMPLATE ================= */

  const downloadTemplate = ()=>{

    const headers = [
      "name",
      "price",
      "category",
      "collection",
      "occasion",
      "flavour",
      "diet",
      "cream",
      "weight",
      "tags",
      "imageUrl"
    ];

    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.setAttribute("href",encodedUri);
    link.setAttribute("download","product_template.csv");

    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="admin-page">

      <h1>Add New Cake 🎂</h1>

      {/* DOWNLOAD TEMPLATE */}

      <button onClick={downloadTemplate}>
        📥 Download Excel Template
      </button>

      {/* DRAG DROP AREA */}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border:"2px dashed #aaa",
          padding:"30px",
          marginTop:"20px",
          textAlign:"center"
        }}
      >
        Drag & Drop Excel File Here
      </div>

      {/* FILE INPUT */}

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e)=>setExcelFile(e.target.files[0])}
      />

      <button
        type="button"
        onClick={handleExcelUpload}
      >
        Import Excel
      </button>

      {/* PROGRESS BAR */}

      {progress>0 && (
        <div style={{marginTop:"10px"}}>
          <div
            style={{
              height:"10px",
              width:progress+"%",
              background:"green"
            }}
          ></div>
          {progress}%
        </div>
      )}

      <hr/>

      {/* PRODUCT FORM */}

      <form className="admin-form" onSubmit={handleSubmit}>

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
          <option value="">Select Collection</option>
          {collections.map(c=>(
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select name="occasionId" onChange={handleChange}>
          <option value="">Select Occasion</option>
          {occasions.map(o=>(
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>

        <h3>Cake Details</h3>

        <input
          name="flavour"
          placeholder="Flavour"
          onChange={handleChange}
        />

        <select name="diet" onChange={handleChange}>
          <option value="egg">Egg</option>
          <option value="eggless">Eggless</option>
        </select>

        <input
          name="cream"
          placeholder="Cream"
          onChange={handleChange}
        />

        <input
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
        />

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