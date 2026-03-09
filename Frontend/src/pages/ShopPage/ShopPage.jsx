import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ShopPage.css";

/* Filter Lists */
const flavoursList = ["chocolate","vanilla","butterscotch","red velvet","strawberry"];
const dietList = ["egg","eggless"];
const creamList = ["whipped","buttercream","truffle"];
const weightList = ["500g","1kg","2kg"];

const ShopPage = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const categoryQuery = query.get("category");
  const collectionQuery = query.get("collection");
  const occasionQuery = query.get("occasion");

  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [collections,setCollections] = useState([]);
  const [occasions,setOccasions] = useState([]);
  const [loading,setLoading] = useState(true);

  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedCream, setSelectedCream] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState([]);

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) =>
    setOpenSection(prev => prev === section ? null : section);

  const toggleFilter = (value, list, setList) => {
    setList(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  };

  /* FETCH DATA */

  useEffect(() => {

    const fetchData = async () => {
      try {

        const [prodRes, catRes, colRes, occRes] = await Promise.all([
          axios.get("http://localhost:5000/api/product/list"),
          axios.get("http://localhost:5000/api/meta/category"),
          axios.get("http://localhost:5000/api/meta/collection"),
          axios.get("http://localhost:5000/api/meta/occasion")
        ]);

        setProducts(prodRes.data);
        setCategories(catRes.data);
        setCollections(colRes.data);
        setOccasions(occRes.data);

        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  /* FILTER ENGINE */

  const filteredProducts = useMemo(() => {

    let result = products;

    /* CATEGORY FILTER */

    if (categoryQuery) {
      const cat = categories.find(c => c.slug === categoryQuery);

      if (cat) {
        result = result.filter(
          p => String(p.categoryId) === String(cat._id) || p.categoryId === cat.slug
        );
      }
    }

    /* COLLECTION FILTER */

    if (collectionQuery) {
      const col = collections.find(c => c.slug === collectionQuery);

      if (col) {
        result = result.filter(
          p => String(p.collectionId) === String(col._id) || p.collectionId === col.slug
        );
      }
    }

    /* OCCASION FILTER */

    if (occasionQuery) {
      const occ = occasions.find(o => o.slug === occasionQuery);

      if (occ) {
        result = result.filter(
          p => String(p.occasionId) === String(occ._id) || p.occasionId === occ.slug
        );
      }
    }

    /* FLAVOUR FILTER */

    if (selectedFlavours.length)
      result = result.filter(p => selectedFlavours.includes(p.flavour));

    /* DIET FILTER */

    if (selectedDiet.length)
      result = result.filter(p => selectedDiet.includes(p.diet));

    /* CREAM FILTER */

    if (selectedCream.length)
      result = result.filter(p => selectedCream.includes(p.cream));

    /* WEIGHT FILTER */

    if (selectedWeight.length)
      result = result.filter(p => selectedWeight.includes(p.weight));

    /* PRICE FILTER */

    result = result.filter(p => p.price <= maxPrice);

    /* SORT */

    if (sort === "low")
      result = [...result].sort((a,b)=>a.price-b.price);

    if (sort === "high")
      result = [...result].sort((a,b)=>b.price-a.price);

    return result;

  },[
    products,
    categories,
    collections,
    occasions,
    categoryQuery,
    collectionQuery,
    occasionQuery,
    sort,
    maxPrice,
    selectedFlavours,
    selectedDiet,
    selectedCream,
    selectedWeight
  ]);

  /* PAGE TITLE */

  let pageTitle = "All Cakes";

  if (categoryQuery) {
    const cat = categories.find(c => c.slug === categoryQuery);
    if (cat) pageTitle = cat.name;
  }

  if (collectionQuery) {
    const col = collections.find(c => c.slug === collectionQuery);
    if (col) pageTitle = col.name;
  }

  if (occasionQuery) {
    const occ = occasions.find(o => o.slug === occasionQuery);
    if (occ) pageTitle = occ.name;
  }

  /* LOADING */

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{padding:"120px", textAlign:"center"}}>
          <h2>Loading cakes...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="shop-page">
        <div className="shop-container">

          {/* SIDEBAR */}

          <aside className="sidebar">

            <h3>Filters</h3>

            <div className="filter-group">
              <label>Sort by Price</label>

              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="">Default</option>
                <option value="low">Low → High</option>
                <option value="high">High → Low</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Max Price: ₹{maxPrice}</label>

              <input
                type="range"
                min="100"
                max="5000"
                value={maxPrice}
                onChange={e=>setMaxPrice(e.target.value)}
              />
            </div>

            <button
              className="clear-btn"
              onClick={()=>{

                setSort("");
                setMaxPrice(5000);
                setSelectedFlavours([]);
                setSelectedDiet([]);
                setSelectedCream([]);
                setSelectedWeight([]);

              }}
            >
              Reset Filters ✖
            </button>

          </aside>

          {/* PRODUCTS */}

          <div className="products-section">

            <div className="shop-header">
              <h2>{pageTitle}</h2>
              <p>{filteredProducts.length} cakes found</p>
            </div>

            {filteredProducts.length === 0 ?

              <p className="empty-msg">No cakes found 😔</p>

              :

              <div className="product-grid">

                {filteredProducts.map(product => (

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                ))}

              </div>

            }

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShopPage;