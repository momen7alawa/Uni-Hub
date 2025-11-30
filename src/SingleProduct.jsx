import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";

const SingleProduct = ({ product, relatedProducts = [], onSelectProduct, onBack }) => {
  const [tab, setTab] = useState("description");
  
  // 1. Removed quantity state
  // const [quantity, setQuantity] = useState(1); ❌

  // Review States
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    comment: "",
    name: "",
    email: ""
  });
  
  const navigate = useNavigate();

  // Scroll Logic
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const timer = setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
    return () => clearTimeout(timer);
  }, [product]);

  // Fetch Reviews Logic
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews?productId=${product.id}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    if (product?.id) {
      fetchReviews();
    }
  }, [product]);

  // Submit Review Logic
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    const newReview = {
      productId: product.id,
      rating: rating,
      comment: reviewForm.comment,
      name: reviewForm.name,
      email: reviewForm.email,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        const savedReview = await res.json();
        setReviews([...reviews, savedReview]);
        setReviewForm({ comment: "", name: "", email: "" });
        setRating(0);
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleExchange = () => {
    navigate(`/exchange/${product.id}`, {
      state: {
        productId: product.id,
        title: product.title,
        image: product.image,
        owner: product.owner,
        price: product.price,
      },
    });
  };

  const handleNavigateToProducts = (e) => {
    e.preventDefault();
    if (onBack) {
        onBack();
    } else {
        navigate("/product");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredRelatedProducts = relatedProducts.filter((item) => {
    const itemCategory = item.category || item.class;
    const currentCategory = product.category || product.class;
    return (itemCategory === currentCategory && item.id !== product.id);
  });

  return (
    <div key={product.id} id="single-product-view" className="ct-container-single-meta">
      <div className="ct-container">
        <nav className="ct-breadcrumbs-single">
          <span className="first-item">
            <a href="#" onClick={handleNavigateToProducts}>
              <span>Products</span>
            </a>
            <span className="ct-separator">/</span>
          </span>
          <span className="last-item">
            <span>{product.title}</span>
          </span>
        </nav>
      </div>

      <div className="ct-container ct-single-product-container">
        <div className="woocommerce-product-gallery">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-summary">
          <h1 className="product-title-single">{product.title}</h1>
          <span className="price">${product.price ? product.price.toFixed(2) : "0.00"}</span>

          <div className="woocommerce-product-details__short-description">
            <p>Unique product with excellent features.</p>
            <p>Experience the best performance with {product.title}.</p>
          </div>

          <div className="cart">
            {/* 2. Removed the .quantity div and buttons here */}

            <button onClick={handleExchange} className="single-product-add-btn">
              Exchange
            </button>
          </div>

          <div className="product_meta">
            <span>SKU: {product.id}</span>
            <span>Category: {product.category}</span>
          </div>
        </div>
      </div>

      <div className="ct-container">
        <div className="ct-product-meta-tabs">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setTab("description"); }}
            className={tab === "description" ? "active" : ""}
          >
            DESCRIPTION
          </a>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setTab("reviews"); }}
            className={tab === "reviews" ? "active" : ""}
          >
            REVIEWS ({reviews.length})
          </a>
        </div>

        <div className="tab-content-wrapper">
          <div className={tab === "description" ? "active-tab" : ""} style={{ display: tab === "description" ? "block" : "none" }}>
            <p>{product.description}</p>
          </div>

          <div className={tab === "reviews" ? "active-tab" : ""} style={{ display: tab === "reviews" ? "block" : "none" }}>
            
            <div className="reviews-list" style={{ marginBottom: "30px" }}>
              {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((rev, index) => (
                  <div key={index} style={{ borderBottom: "1px solid #444", padding: "15px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong>{rev.name}</strong>
                      <span style={{ color: "#fbbf24" }}>{"★".repeat(rev.rating)}</span>
                    </div>
                    <p style={{ marginTop: "5px", color: "#ccc" }}>{rev.comment}</p>
                    <small style={{ color: "#777" }}>{new Date(rev.date).toLocaleDateString()}</small>
                  </div>
                ))
              )}
            </div>

            <h3>Add a review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="review-form-container">
                <p className="comment-form-rating">
                  <label>Your rating</label>
                  <span className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={rating >= star ? "filled" : ""}
                        onClick={() => setRating(star)}
                        style={{ cursor: "pointer", fontSize: "1.5rem", color: rating >= star ? "#fbbf24" : "#ccc" }}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                </p>

                <textarea 
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleInputChange}
                  required 
                  placeholder="Write your review..." 
                />
                
                <input 
                  name="name"
                  value={reviewForm.name}
                  onChange={handleInputChange}
                  required 
                  placeholder="Name" 
                />
                
                <input 
                  name="email"
                  type="email"
                  value={reviewForm.email}
                  onChange={handleInputChange}
                  required 
                  placeholder="Email" 
                />

                <button type="submit" className="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <RelatedProducts
        products={filteredRelatedProducts}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};

export default SingleProduct;