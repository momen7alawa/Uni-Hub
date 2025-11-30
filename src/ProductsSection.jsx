 // src/Main-Page-Components/ProductsSection.jsx
import React from "react";

const shortenTitle = (title, max = 40) =>
  title.length > max ? title.slice(0, max) + "…" : title;

const ProductsSection = ({ products = [], loading = false, onSelectProduct }) => {
  return (
    <section className="products-section">
      {loading ? (
        <p className="products-loading">Loading tools…</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className="product-card"
              onClick={() => onSelectProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>

              <div className="product-body">
                <h3 className="product-name">{shortenTitle(product.title)}</h3>
                <p className="product-category">{product.category}</p>

                <div className="product-footer">
                  <span className="product-value">${product.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
