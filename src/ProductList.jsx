// src/Main-Page-Components/ProductList.jsx
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
        // 🔴 هنا ربطنا React بالـ json-server
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

  // ⬅️ منطق الفرز (Sorting Logic)
  const sortedProducts = useMemo(() => {
    if (!products.length) return [];

    // نشتغل على نسخة من المصفوفة عشان ما نعدّلش الـ state مباشرة
    const sortableProducts = [...products];

    switch (sortType) {
      case "price_asc":
        // لو حابب تستخدم price بعدين، الكود جاهز
        return sortableProducts.sort(
          (a, b) => (a.price || 0) - (b.price || 0)
        );
      case "price_desc":
        return sortableProducts.sort(
          (a, b) => (b.price || 0) - (a.price || 0)
        );
      case "name_asc":
        // الفرز حسب الاسم A → Z
        return sortableProducts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case "name_desc":
        // الفرز حسب الاسم Z → A
        return sortableProducts.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      default:
        // بدون فرز: رجّع اللي طالع من الـ API زي ما هو
        return products;
    }
  }, [products, sortType]);

  return (
    <main className="product-page">
      {/* الجزء اللي فوق: العنوان + خيارات الفرز */}
      <div className="top-section-controls">
        {/* لو PageTitle محتاج props زي title ابعتها، لو لأ سيبه زي ما هو */}
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

      {/* تمرير قائمة المنتجات بعد الفرز */}
      <ProductsSection
        products={sortedProducts}
        loading={loading}
        onSelectProduct={() => {}} // لو عندك SingleProduct استخدم هنا الهاندلر الحقيقي
      />
    </main>
  );
};

export default ProductList;
