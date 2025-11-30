// src/components/Testimonials.js
import React from 'react';

const testimonials = [
    {
        user: "Ahmed Yasser",
        job: " Engineering Studen",
        img: "https://startersites.io/blocksy/gadgets/wp-content/uploads/2022/05/testimonial-user-1.webp",
        review: " I quickly found the specific scientific calculator I needed for my physics class, and I exchanged my old marketing textbook. This platform is a lifesaver for student budgets!"
    },
    {
        user: " Alaa Mohamed",
        job: " Literature Major",
        img: "https://startersites.io/blocksy/gadgets/wp-content/uploads/2022/05/testimonial-user-2.webp",
        review: " Finding quality, second-hand art supplies used to be impossible. The exchange process was so simple and secure. It’s great to support sustainability within the campus community"
    },
    {
        user: "Nour Ali",
        job: " Business Administration",
        img: "https://startersites.io/blocksy/gadgets/wp-content/uploads/2022/05/testimonial-user-3.webp",
        review: " The user interface is fantastic—clean and easy to navigate. I sold my entire set of geometry tools in just one day. Highly recommend this for every university student"
    },
    {
        user: "Yaseen Ahmed",
        job: " Pharmacy Student",
        img: "https://startersites.io/blocksy/gadgets/wp-content/uploads/2022/05/testimonial-user-4.webp",
        review: " I needed an affordable camera lens for a project. I got a great deal and the communication with the seller was excellent. A truly smart way to handle used school gear"
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <h3 className="text-center section-title"> Hear From Our Satisfied Students</h3>
                <div className="testimonials-grid">
                    {testimonials.map((t, index) => (
                        <div key={index} className="review-card">
                            <img src={t.img} alt={t.user} className="avatar" />
                            <div className="review-content">
                                <p>{t.review}</p>
                                <h6>{t.user}</h6>
                                <span className="job">{t.job}</span>
                            </div>
                        </div>
                    ))}
                </div>
                 
            </div>
        </section>
    );
};

export default Testimonials;