import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
/* ADMIN PAGES */
import AdminLayout from "./admin/Components/AdminLayout/AdminLayout";
import Dashboard from "./admin/Pages/Dashboard/Dashboard";
import AddProduct from "./admin/Pages/AddProduct/AddProduct";
import ProductsList from "./admin/Pages/ProductList/ProductList";
import ShopPage from "./pages/ShopPage/ShopPage";
import AddCategory from "./admin/Pages/AddCategory/AddCategory";
import AddCollections from "./admin/Pages/AddCollections/AddCollections";
import AddOccasion from "./admin/Pages/AddOccasion/AddOccasion";
import AddTags from "./admin/Pages/AddTags/AddTags";

const App = () => {
  return (
    <Routes>

      {/* USER WEBSITE */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ShopPage/>} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="add-categories" element={<AddCategory />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="add-collections" element={<AddCollections />} />
        <Route path="add-occasions" element={<AddOccasion />} />
        <Route path="add-tags" element={<AddTags />} />
      </Route>

    </Routes>
  );
};

export default App;