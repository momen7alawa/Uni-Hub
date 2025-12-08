import "bootstrap/dist/js/bootstrap.bundle.min.js";
import img1 from "./assets/photos/Team work-amico.png"
import React from 'react';
import Testimonials from "./components/Testimonials";
import './Main-Page-Components/About.css';
import { Link } from "react-router-dom";
import TeamGrid from "./components/TeamGrid";
import StatsCounter from "./components/StatsCounter";
import PageTitle from "./components/PageTitle";
import AddTool from "./AddTool";
const App = () => {
  return (
    <>
      <main>
        <PageTitle />

        <section className="main-content-overlap">
          <div className="container">
            <div className="hero-image-wrapper">
              <img src={img1} alt="وصف المنتج 1" />
            </div>

            <TeamGrid />
            <div className="spacer-lg"></div>

            <div className="mission-statement text-center">
              <h2>  GIVE YOUR OLD SCHOOL SUPPLIES A NEW LIFE
                <br /> AND FIND WHAT YOU NEED. </h2>
            </div>

            <div className="spacer-md"></div>

            <StatsCounter />

            <div className="spacer-md"></div>

            <div className="subtitle-text text-center max-w-800  ">
              <p>
                "Do you have books, gadgets, or university supplies you no longer need? Our platform connects students directly, facilitating the exchange of old items and giving them a second life. Join our community to save money, support sustainability, and easily find everything you need for the academic year from your peers. Start exchanging now and be part of the solution!"
              </p>
            </div> <div className="cta-group text-center">
              <Link to="/product" className="btn btn-primary">Exchange Now</Link> {/* تم تغيير /products إلى /product */}
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>

            <div className="spacer-lg"></div>
          </div>
        </section>

        <Testimonials />
<AddTool/>
      </main>
    </>
  );
};

export default App;
