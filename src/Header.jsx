// src/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./img/1.png"; 
// 1. Import the Auth Hook
import { useAuth } from "./AuthContext";

const normalizeItem = (item, index = 0) => {
  let imagePath = item.imageURL || item.image || "";
  if (
    imagePath.startsWith("./../images/") ||
    imagePath.startsWith("././images/") ||
    imagePath.startsWith("./images/")
  ) {
    const parts = imagePath.split("/");
    imagePath = "/images/" + parts[parts.length - 1];
  }

  return {
    id: item.id ?? index + 1,
    title: item.title,
    image: imagePath,
    category: item.class || item.category || "Tools",
    price: typeof item.price === "number" ? item.price : 0,
    description:
      item.description ||
      `Shared tool: ${item.title}${
        item.owner ? ` (owner: ${item.owner})` : ""
      }.`,
    owner: item.owner,
    class: item.class,
  };
};

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  
  // 2. Get user and logout function from Context
  const { user, logout } = useAuth();

  const openSearch = async () => {
    setIsSearchOpen(true);
    setSearchQuery("");

    try {
      if (!allProducts.length) {
        setSearchLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items`);
        if (!res.ok) throw new Error("Failed to load items");
        const raw = await res.json();
        const normalized = raw.map((item, idx) => normalizeItem(item, idx));
        setAllProducts(normalized);
        setSearchResults(normalized);
      } else {
        setSearchResults(allProducts);
      }
    } catch (err) {
      console.error("Error loading items for search:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults(allProducts);
      return;
    }

    const q = value.toLowerCase();
    const filtered = allProducts.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.owner && p.owner.toLowerCase().includes(q))
      );
    });

    setSearchResults(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleResultClick = (product) => {
    navigate("/product", { state: { product } });
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // 3. Handle Logout Click
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/home">
              <img
                src={logo}
                alt="UNIHub logo"
                style={{ height: "40px" }}
              />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/product">Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/AddTool">AddTool</Link>
                </li>
              </ul>

              <div className="navbar-nav ms-auto align-items-center">
                <button
                  className="btn btn-link nav-link p-0 me-3"
                  type="button"
                  onClick={openSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                {/* 4. Conditional Rendering for User vs Login */}
                {user ? (
                          <div className="nav-item dropdown">
                            <a 
                              className="nav-link dropdown-toggle d-flex align-items-center" 
                              href="#" 
                              id="userDropdown" 
                              role="button" 
                              data-bs-toggle="dropdown" 
                              aria-expanded="false"
                              style={{ color: '#fff' }}
                            >
                              <i className="bi bi-person-circle me-2"></i>
                              <span>{user.username}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end bg-dark" aria-labelledby="userDropdown">
                              <li>
                                <span className="dropdown-item-text text-light small">
                                  {user.email}
                                </span>
                              </li>
                              <li><hr className="dropdown-divider bg-secondary" /></li>
                              
                              {/* NEW LINK HERE */}
                              <li>
                                <Link className="dropdown-item text-light" to="/notifications">
                                  <i className="bi bi-envelope me-2"></i>
                                  Inbox / Notifications
                                </Link>
                              </li>
                              
                              <li><hr className="dropdown-divider bg-secondary" /></li>
                              <li>
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                  <i className="bi bi-box-arrow-right me-2"></i>
                                  Logout
                                </button>
                              </li>
                            </ul>
                          </div>
                        ) : (
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/login"
                  >
                    <i className="d-none d-lg-inline m-1 bi bi-mortarboard"></i>
                    <span>Log in</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY (No Changes Here) */}
      {isSearchOpen && (
        <div className="search-overlay">
          <button
            className="search-overlay-close"
            type="button"
            onClick={handleCloseSearch}
            aria-label="Close search"
          >
            &times;
          </button>

          <form className="search-overlay-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-overlay-input"
              placeholder="Search for tools…"
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-overlay-button" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <div className="search-results">
            {searchLoading ? (
              <p className="search-loading">Loading tools…</p>
            ) : searchResults.length ? (
              <ul className="search-results-list">
                {searchResults.map((product) => (
                  <li key={product.id} className="search-results-item-wrapper">
                    <button
                      type="button"
                      className="search-result-item"
                      onClick={() => handleResultClick(product)}
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="search-result-thumb"
                        />
                      )}
                      <div className="search-result-text">
                        <h4 className="search-result-title">
                          {product.title}
                        </h4>
                        {product.category && (
                          <p className="search-result-meta">
                            {product.category}
                          </p>
                        )}
                        {product.owner && (
                          <p className="search-result-meta">
                            Owner: {product.owner}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="search-no-results">
                {searchQuery
                  ? "No tools match your search."
                  : "Start typing to search for tools."}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
