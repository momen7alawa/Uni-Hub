import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import aboutImage from '../img/ChatGPT Image Nov 26, 2025, 12_22_59 AM.png';
import backpackImage from '../img/ChatGPT Image Nov 26, 2025, 01_08_05 AM.png';
import ProductsSection from '../ProductsSection';
import SingleProduct from '../SingleProduct';

const normalizeItem = (item, index = 0) => {
  let imagePath = item.imageURL || item.image || '';

  if (
    imagePath.startsWith('./../images/') ||
    imagePath.startsWith('././images/') ||
    imagePath.startsWith('./images/')
  ) {
    const parts = imagePath.split('/');
    imagePath = '/images/' + parts[parts.length - 1];
  }

  return {
    id: item.id ?? index + 1,
    title: item.title,
    image: imagePath,
    category: item.class || item.category || 'Tools',
    price: typeof item.price === 'number' ? item.price : 0,
    description:
      item.description ||
      `Shared tool: ${item.title}${item.owner ? ` (owner: ${item.owner})` : ''}.`,
    owner: item.owner,
    class: item.class,
  };
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // ✅ استخدمنا useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items?_limit=9`);
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        const normalized = data.map((item, idx) => normalizeItem(item, idx));
        setProducts(normalized);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="home-page">
      {selectedProduct ? (
        <SingleProduct
          product={selectedProduct}
          onBack={handleBack}
          relatedProducts={products}
          onSelectProduct={handleSelectProduct}
        />
      ) : (
        <>
          <section className="home-hero">
            <div className="home-hero-inner">
              <p className="home-hero-tagline">Campus tools exchange</p>
              <h1 className="home-hero-title">
                Swap your study tools
                <br />
                with other students
              </h1>
              <p className="home-hero-description">
                Exchange calculators, lab kits, drawing tools and more with students
                across your university. Save money, reduce waste, and always have
                the tools you need.
              </p>
              <div className="home-hero-actions">
                <button
                  className="home-hero-btn"
                  onClick={() => navigate('/product')}
                >
                  Exchange
                </button>
              </div>
            </div>

            <div className="home-feature-strip">
              <div className="home-feature-item">
                <div className="home-feature-icon">
                  <i className="bi bi-arrow-left-right"></i>
                </div>
                <div>
                  <h4 className="home-feature-title">Fast Exchange</h4>
                  <p className="home-feature-text">
                    Match with nearby students and swap tools in minutes.
                  </p>
                </div>
              </div>
              <div className="home-feature-item">
                <div className="home-feature-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div>
                  <h4 className="home-feature-title">Safe &amp; Verified</h4>
                  <p className="home-feature-text">
                    All accounts are verified with university emails.
                  </p>
                </div>
              </div>
              <div className="home-feature-item">
                <div className="home-feature-icon">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div>
                  <h4 className="home-feature-title">Flexible Timing</h4>
                  <p className="home-feature-text">
                    Arrange exchange times that fit your schedule.
                  </p>
                </div>
              </div>
              <div className="home-feature-item">
                <div className="home-feature-icon">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <div>
                  <h4 className="home-feature-title">Built-in Chat</h4>
                  <p className="home-feature-text">
                    Chat with other students to confirm every exchange.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="home-about" id="about">
            <div className="home-about-inner">
              <div className="home-about-text">
                <p className="home-about-tagline">About UniTools</p>
                <h2 className="home-about-title">
                  Share your tools.
                  <br />
                  Study smarter.
                </h2>
                <p className="home-about-description">
                  UniTools helps university students exchange their study tools
                  instead of buying new ones every semester. Swap calculators, lab
                  kits, drawing tools and more with verified students on your campus
                  in a safe and simple way.
                </p>
                <ul className="home-about-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>
                      Keep your budget for what really matters, not extra tools.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Reduce waste by reusing high-quality study equipment.</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>
                      Connect with students from different faculties on campus.
                    </span>
                  </li>
                </ul>
                <button
                  className="home-about-btn"
                  onClick={() => navigate('/about')}
                >
                  Learn more about us
                </button>
              </div>

              <div className="home-about-image">
                <div className="home-about-circle"></div>
                <img
                  src={aboutImage}
                  alt="Students using UniTools to share study tools"
                  className="home-about-img"
                />
              </div>
            </div>
          </section>

          <section id="products" className="home-products-section">
            <ProductsSection
              products={products}
              loading={loading}
              onSelectProduct={handleSelectProduct}
            />
          </section>

          <section className="home-pack">
            <div className="home-pack-inner">
              <div className="home-pack-image">
                <img
                  src={backpackImage}
                  alt="3D study backpack with tools"
                  className="home-pack-img"
                />
              </div>

              <div className="home-pack-text">
                <p className="home-pack-tagline">All-in-one study kit</p>
                <h2 className="home-pack-title">
                  Pack your bag with the tools
                  <br />
                  you actually use.
                </h2>
                <p className="home-pack-description">
                  Mix and match tools from different faculties – from engineering
                  to architecture to science. Keep everything organized in a single
                  smart backpack, ready for every lab and lecture.
                </p>
                <ul className="home-pack-list">
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>Swap tools before midterms and finals easily.</span>
                  </li>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>Perfect fit for campus lockers and daily commutes.</span>
                  </li>
                </ul>

                <button
                  className="home-pack-btn"
                  onClick={() => navigate('/product')}
                >
                  Explore available tools
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
