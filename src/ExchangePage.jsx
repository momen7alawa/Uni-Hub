// src/ExchangePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ExchangePage = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const productFromState = location.state || {};

  // Initialize with logged-in user data
  const [senderName, setSenderName] = useState(user?.username || "");
  const [senderEmail, setSenderEmail] = useState(user?.email || "");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setSenderName(user.username || "");
      setSenderEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create the message object
    const payload = {
      productId: productFromState.productId || itemId,
      productTitle: productFromState.title || "Unknown Tool",
      productImage: productFromState.image || "",
      
      // The person receiving the message (The Tool Owner)
      owner: productFromState.owner, 
      
      // The person sending the message (Current User)
      senderName,
      senderEmail,
      
      meetingPlace,
      message,
      createdAt: new Date().toISOString(),
      read: false // New field to track if message was read
    };

    try {
      // 2. Save directly to db.json
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/exchangeMessages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");

      alert("Message sent to the owner's inbox!");
      navigate("/product"); // Go back to products
      
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    }
  };

  return (
    <main className="exchange-page ct-container">
      <div className="exchange-header">
        <h1>Exchange Request</h1>
        <p>Send a message to <strong>{productFromState.owner}</strong></p>
      </div>

      <div className="exchange-layout">
        {/* Left Side: Product Info */}
        <aside className="exchange-product-card">
          {productFromState.image && (
            <img src={productFromState.image} alt={productFromState.title} className="exchange-product-image" />
          )}
          <h2 className="exchange-product-title">{productFromState.title}</h2>
          <Link to="/product" className="exchange-back-link">← Back to products</Link>
        </aside>

        {/* Right Side: Simple Form */}
        <section className="exchange-form-wrapper">
          <form className="exchange-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Your Name</label>
                <input type="text" value={senderName} readOnly />
              </div>
              <div className="form-field">
                <label>Your Contact Email</label>
                <input type="email" value={senderEmail} readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Suggested Meeting Place</label>
              <input 
                type="text" 
                value={meetingPlace} 
                onChange={(e) => setMeetingPlace(e.target.value)}
                placeholder="e.g. Library Main Gate"
                required 
              />
            </div>

            <div className="form-field">
              <label>Message</label>
              <textarea 
                rows="4" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I have the item you are looking for..."
                required 
              />
            </div>

            <button type="submit" className="single-product-add-btn">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ExchangePage;