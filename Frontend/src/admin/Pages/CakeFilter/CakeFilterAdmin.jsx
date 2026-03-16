import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../config/api";
import "./CakeFilterAdmin.css";

const iconOptions = [
  "CakeSlice",
  "Sparkles",
  "Gift",
  "Package",
  "Crown",
  "Heart",
  "CupSoda",
  "Image"
];

const CakeFilterAdmin = () => {

  const [filters,setFilters] = useState([]);
  const [name,setName] = useState("");
  const [icon,setIcon] = useState("CakeSlice");

  const fetchFilters = async () => {

    try{

      const res = await axios.get(`${API}/meta/cake-filter`);
      setFilters(res.data.items || res.data);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    fetchFilters();
  },[]);

  const handleAdd = async () => {

    if(!name) return;

    try{

      await axios.post(`${API}/meta/cake-filter`,{
        name,
        icon
      });

      alert("✅ Cake filter added successfully");

      setName("");
      setIcon("CakeSlice");

      fetchFilters();

    }catch(err){
      alert("❌ Failed to add filter");
    }

  };

  const handleDelete = async(id)=>{

    try{

      await axios.delete(`${API}/meta/cake-filter/${id}`);

      alert("🗑️ Filter deleted");

      fetchFilters();

    }catch(err){
      alert("❌ Failed to delete");
    }

  };

  return (

    <div className="admin-page">

      <h2>Cake Filters</h2>

      <div style={{marginBottom:"20px"}}>

        <input
          type="text"
          placeholder="Enter cake filter name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <select
          value={icon}
          onChange={(e)=>setIcon(e.target.value)}
        >

          {iconOptions.map((i)=>(
            <option key={i} value={i}>
              {i}
            </option>
          ))}

        </select>

        <button onClick={handleAdd}>
          Add
        </button>

      </div>

      <ul>

        {filters.map(item=>(
          <li key={item._id}>

            {item.name} ({item.icon})

            <button
              onClick={()=>handleDelete(item._id)}
            >
              Delete
            </button>

          </li>
        ))}

      </ul>

    </div>

  );

};

export default CakeFilterAdmin;