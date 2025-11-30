// src/components/PageTitle.js
import React from 'react';

const PageTitle = () => {
    return (
        <section className="page-title-section">
            <div className="container text-center">
                <nav className="breadcrumbs">
                    <a href="#">Home</a> / <span>About Us</span>
                </nav>
                <h1>About Us</h1>
            </div>
        </section>
    );
};

export default PageTitle;