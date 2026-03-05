import { useEffect, useState } from "react";
import axios from "axios";
import "./AddOccasion.css";

const AddOccasion = () => {

  const [occasions,setOccasions] = useState([]);
  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");
  const [image,setImage] = useState(null);

  const API = "http://localhost:5000/api/meta/occasion";

  /* FETCH OCCASIONS */
  const fetchOccasions = async ()=>{
    const res = await axios.get(API);
    setOccasions(res.data);
  };

  useEffect(()=>{
    fetchOccasions();
  },[]);

  /* ADD OCCASION */
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
    fetchOccasions();
  };

  /* DELETE */
  const deleteOccasion = async(id)=>{
    await axios.delete(`${API}/${id}`);
    fetchOccasions();
  };

  return (
    <div className="occasion-page">

      <h1>Occasions</h1>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="occasion-form">

        <input
          placeholder="Occasion Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Slug (valentine)"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
        />

        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

        <button>Add Occasion</button>
      </form>

      {/* LIST */}
      <div className="occasion-grid">
        {occasions.map(o=>(
          <div key={o._id} className="occasion-card">
            <img src={o.image} alt="" />
            <h3>{o.name}</h3>
            <p>{o.slug}</p>
            <button onClick={()=>deleteOccasion(o._id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AddOccasion;