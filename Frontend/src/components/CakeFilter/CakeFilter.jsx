import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./CakeFilter.css";
import API from "../../config/api";

import {
  CakeSlice,
  Sparkles,
  Gift,
  Package,
  Crown,
  Heart,
  CupSoda,
  Image
} from "lucide-react";

/* ICON MAP */

const iconMap = {
  CakeSlice: <CakeSlice size={28} />,
  Sparkles: <Sparkles size={28} />,
  Gift: <Gift size={28} />,
  Package: <Package size={28} />,
  Crown: <Crown size={28} />,
  Heart: <Heart size={28} />,
  CupSoda: <CupSoda size={28} />,
  Image: <Image size={28} />
};

const CakeFilter = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [filters,setFilters] = useState([]);

  const query = new URLSearchParams(location.search);
  const activeSlug = query.get("filter");

  /* FETCH FILTERS */

  useEffect(()=>{

    const fetchFilters = async () => {

      try{

        const res = await axios.get(`${API}/meta/cake-filter`);
        setFilters(res.data);

      }catch(err){
        console.log(err);
      }

    };

    fetchFilters();

  },[]);

  /* CLICK FILTER */

  const handleClick = (filter) => {

    const newQuery = new URLSearchParams(location.search);

    if(newQuery.get("filter") === filter.slug){
      newQuery.delete("filter");
    }else{
      newQuery.set("filter",filter.slug);
    }

    navigate(`/shop?${newQuery.toString()}`);

  };

  return (

    <section className="cake-filter">

      <h2>Browse Cakes</h2>

      <div className="filter-row">

        {filters.map((item)=>(

          <div
            key={item._id}
            className={`filter-card ${activeSlug === item.slug ? "active" : ""}`}
            onClick={()=>handleClick(item)}
          >

            {iconMap[item.icon] || <CakeSlice size={28}/>}

            <p>{item.name}</p>

          </div>

        ))}

      </div>

    </section>

  );

};

export default CakeFilter;