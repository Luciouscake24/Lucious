import { useEffect, useState } from "react";
import axios from "axios";
import "./AddTags.css";

const AddTags = () => {

  const [tags,setTags] = useState([]);
  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");

  const API = "http://localhost:5000/api/meta/tag";

  /* FETCH TAGS */
  const fetchTags = async ()=>{
    const res = await axios.get(API);
    setTags(res.data);
  };

  useEffect(()=>{
    fetchTags();
  },[]);

  /* ADD TAG */
  const handleSubmit = async (e)=>{
    e.preventDefault();

    await axios.post(API,{ name, slug });

    setName("");
    setSlug("");
    fetchTags();
  };

  /* DELETE */
  const deleteTag = async(id)=>{
    await axios.delete(`${API}/${id}`);
    fetchTags();
  };

  return (
    <div className="tag-page">

      <h1>Tags</h1>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="tag-form">
        <input
          placeholder="Tag Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Slug (premium)"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
        />

        <button>Add Tag</button>
      </form>

      {/* LIST */}
      <div className="tag-grid">
        {tags.map(tag=>(
          <div key={tag._id} className="tag-card">
            <h3>{tag.name}</h3>
            <p>{tag.slug}</p>
            <button onClick={()=>deleteTag(tag._id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AddTags;