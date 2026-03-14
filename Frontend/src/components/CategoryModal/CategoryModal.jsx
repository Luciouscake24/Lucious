import "./CategoryModal.css";
import { X, ShoppingCart, ArrowLeft } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const CategoryModal = ({ category, closeModal }) => {

  const { dispatch } = useContext(StoreContext);

  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [qty, setQty] = useState({});

  /* BODY SCROLL LOCK */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* FETCH COLLECTIONS + PRODUCTS */

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/meta/collection")
      .then(res => {
        console.log("Collections:", res.data);
        setCollections(res.data);
      });

    axios
      .get("http://localhost:5000/api/product/list")
      .then(res => {
        console.log("Products:", res.data);
        setProducts(res.data);
      });

  }, []);

  if (!category) return null;

  /* FILTER COLLECTIONS BY CATEGORY */

  const categoryCollections = collections.filter(
    col =>
      col.categoryIds?.some(
        id => id.toString() === category._id
      )
  );

  /* FILTER PRODUCTS BY COLLECTION */

  let collectionProducts = [];

  if (selectedCollection) {

    collectionProducts = products.filter(
      p =>
        p.collectionId === selectedCollection._id ||
        p.collectionSlug === selectedCollection.slug
    );

    /* SEARCH */

    collectionProducts = collectionProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    /* SORT */

    if (sort === "low") {
      collectionProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      collectionProducts.sort((a, b) => b.price - a.price);
    }

  }

  /* CART FUNCTIONS */

  const handleAddFirstTime = (cake) => {

    setQty(prev => ({
      ...prev,
      [cake._id]: 1
    }));

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...cake, quantity: 1 }
    });

  };

  const changeQty = (id, type) => {

    setQty(prev => {

      const current = prev[id] || 0;

      const newQty =
        type === "inc"
          ? current + 1
          : Math.max(current - 1, 0);

      dispatch({
        type: "UPDATE_CART_QTY",
        payload: { id, quantity: newQty }
      });

      return {
        ...prev,
        [id]: newQty
      };

    });

  };

  return (

    <div className="modal-overlay" onClick={closeModal}>

      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="modal-header">

          {selectedCollection && (
            <ArrowLeft
              className="back-btn"
              onClick={() => setSelectedCollection(null)}
            />
          )}

          <h2>
            {selectedCollection
              ? selectedCollection.name
              : category.name}
          </h2>

          <X
            onClick={closeModal}
            className="close-btn"
          />

        </div>

        {/* COLLECTION VIEW */}

        {!selectedCollection && (

          <div className="modal-products">

            {categoryCollections.length === 0 && (
              <p>No collections found</p>
            )}

            {categoryCollections.map((col) => (

              <div
                className="modal-card collection-card"
                key={col._id}
                onClick={() => setSelectedCollection(col)}
              >

                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
                <h3>{col.name}</h3>

                <button className="add-btn">
                  View Cakes
                </button>

              </div>

            ))}

          </div>

        )}

        {/* PRODUCTS VIEW */}

        {selectedCollection && (

          <>

            {/* SEARCH + SORT */}

            <div className="modal-controls">

              <input
                type="text"
                placeholder="Search cakes..."
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                onChange={(e) => setSort(e.target.value)}
              >

                <option value="default">
                  Sort
                </option>

                <option value="low">
                  Price Low → High
                </option>

                <option value="high">
                  Price High → Low
                </option>

              </select>

            </div>

            {/* PRODUCTS */}

            <div className="modal-products">

              {collectionProducts.length === 0 && (
                <p>No cakes found</p>
              )}

              {collectionProducts.map((cake) => (

                <div
                  className="modal-card"
                  key={cake._id}
                >

                  <img
                    src={cake.image}
                    alt={cake.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />

                  <h3>{cake.name}</h3>

                  <p>₹{cake.price}</p>

                  {!qty[cake._id] ? (

                    <button
                      className="add-btn"
                      onClick={() => handleAddFirstTime(cake)}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>

                  ) : (

                    <div className="qty">

                      <button
                        onClick={() => changeQty(cake._id, "dec")}
                      >
                        -
                      </button>

                      <span>
                        {qty[cake._id]}
                      </span>

                      <button
                        onClick={() => changeQty(cake._id, "inc")}
                      >
                        +
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>

  );

};

export default CategoryModal;