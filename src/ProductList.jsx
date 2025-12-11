import React, { useEffect, useState, useMemo } from "react";
import ProductsSection from "../ProductsSection";
import PageTitle from "../Pagetitle";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("none"); // نوع الفرز

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items`);
        if (!res.ok) {
          throw new Error("Failed to fetch items from json-server");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    if (!products.length) return [];

    const sortableProducts = [...products];

    switch (sortType) {
      case "price_asc":
        return sortableProducts.sort(
          (a, b) => (a.price || 0) - (b.price || 0)
        );
      case "price_desc":
        return sortableProducts.sort(
          (a, b) => (b.price || 0) - (a.price || 0)
        );
      case "name_asc":
        return sortableProducts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case "name_desc":
        return sortableProducts.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      default:
        return products;
    }
  }, [products, sortType]);

  return (
    <main className="product-page">
      <div className="top-section-controls">
        <PageTitle title="Available Tools" />

        <div className="sort-options">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="none">Default</option>
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
            <option value="price_asc">Price (Low → High)</option>
            <option value="price_desc">Price (High → Low)</option>
          </select>
        </div>
      </div>

      <ProductsSection
        products={sortedProducts}
        loading={loading}
        onSelectProduct={() => {}} // لو عندك SingleProduct استخدم هنا الهاندلر الحقيقي
      />
    </main>
  );
};

export default ProductList;
