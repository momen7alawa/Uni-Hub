 
import React from 'react';

const Newsletter = () => {
     

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Subscription attempt!');
       
    };

    return (
        <section className="newsletter-section bg-dark">
            <div className="container">
                <div className="newsletter-content">
                    <h2>Don’t Miss Our News</h2>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Your Email Address *" 
                            required 
                        />
                        <button type="submit" className="btn btn-primary">SUBSCRIBE</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;