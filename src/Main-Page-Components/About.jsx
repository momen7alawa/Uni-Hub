// src/pages/About.jsx
import React from "react";
import "./About.css";

import PageTitle from "../components/PageTitle";
import StatsCounter from "../components/StatsCounter";
import TeamGrid from "../components/TeamGrid";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

import img1 from "./../img/Team work-amico.png";
const About = () => {
    return (
        <>

            <PageTitle />
            <section className="main-content-overlap">
                <div className="container">


                    <div className="hero-image-wrapper">
                        <img src={img1} alt="About Hero" />
                    </div>

                    <TeamGrid />
                    <div className="spacer-lg"></div>


                    <div className="mission-statement text-center">
                        <h2>
                            GIVE YOUR OLD SCHOOL SUPPLIES A NEW LIFE
                            <br /> AND FIND WHAT YOU NEED.
                        </h2>
                    </div>

                    <div className="spacer-md"></div>


                    <StatsCounter />

                    <div className="spacer-md"></div>


                    <div className="subtitle-text text-center max-w-800">
                        <p>
                            "Do you have books, gadgets, or university supplies you no longer need?
                            Our platform connects students directly, facilitating the exchange of old items
                            and giving them a second life. Join our community to save money, support
                            sustainability, and easily find everything you need for the academic year from
                            your peers. Start exchanging now and be part of the solution!"
                        </p>
                    </div>


                    <div className="cta-group text-center">
                        <Link to="/product" className="btn btn-primary">Exchange Now</Link>
                        <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                    </div>

                    <div className="spacer-lg"></div>
                </div>
            </section>


            <Testimonials />
        </>
    );
};

export default About;
