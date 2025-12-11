import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/exchangeMessages?owner=${encodeURIComponent(user.username)}`)
        .then((res) => res.json())
        .then((data) => {
          const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setMessages(sorted);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="ct-container" style={{ padding: "50px", textAlign: "center", color: "#fff" }}>
        <h2>Please log in to view your notifications.</h2>
        <Link to="/login" className="btn btn-primary mt-3">Log In</Link>
      </div>
    );
  }

  return (
    <main className="ct-container" style={{ minHeight: "80vh", padding: "40px 20px" }}>
      <h1 style={{ color: "#fff", marginBottom: "30px", borderBottom: "1px solid #444", paddingBottom: "10px" }}>
        Your Inbox
      </h1>

      {loading ? (
        <p style={{ color: "#ccc" }}>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", marginTop: "50px" }}>
          <h3>No messages yet.</h3>
          <p>When someone wants your tools, their requests will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                backgroundColor: "#1e293b", 
                border: "1px solid #334155", 
                borderRadius: "12px", 
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                color: "#f8fafc"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #334155", paddingBottom: "10px" }}>
                <div>
                  <h4 style={{ margin: 0, color: "#a855f7" }}>Item: {msg.productTitle}</h4>
                  <small style={{ color: "#94a3b8" }}>From: {msg.senderName} ({msg.senderEmail})</small>
                </div>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div style={{ marginTop: "10px" }}>
                <p style={{ margin: "5px 0" }}><strong>Message:</strong></p>
                <p style={{ backgroundColor: "#0f172a", padding: "10px", borderRadius: "6px", color: "#cbd5e1" }}>
                  {msg.message}
                </p>
              </div>

              <div style={{ marginTop: "5px" }}>
                <span style={{ color: "#fbbf24", fontWeight: "bold" }}> Meeting Place: </span>
                <span>{msg.meetingPlace}</span>
              </div>
              
              <div style={{ marginTop: "15px" }}>
                 <a href={`mailto:${msg.senderEmail}`} style={{ 
                     display: "inline-block", 
                     backgroundColor: "#2563eb", 
                     color: "white", 
                     padding: "8px 16px", 
                     borderRadius: "4px", 
                     textDecoration: "none",
                     fontSize: "0.9rem"
                 }}>
                    Reply via Email
                 </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Notifications;