import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/product", { state: { product } });
  };

  if (!products.length) return null;

  return (
    <section className="related-products">
      <h2 className="related-products-title">Related Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <article
            key={product.id}
            className="product-card"
            onClick={() => handleClick(product)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>

            <div className="product-body">
              <h3 className="product-name">{product.title}</h3>
              {product.category && (
                <p className="product-category">{product.category}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
