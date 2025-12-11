import React, { useRef, useEffect, useState } from 'react';

const STATS_DATA = [
    { target: 300, label: '  Items Exchanged' },
    { target: 250, label: '  Students Benefited' },
    { target: 100, label: '  Community Satisfaction', isPercentage: true },
];

const StatItem = ({ target, label, isPercentage = false }) => {
    const [currentCount, setCurrentCount] = useState(0);
    const countRef = useRef(null);

    const startCount = (finalTarget) => {
        const duration = 2000;
        let current = 0;
        const stepTime = Math.abs(Math.floor(duration / finalTarget));
        
        const increment = Math.ceil(finalTarget / 100); 
        
        const timer = setInterval(() => {
            current += increment; 
            if (current >= finalTarget) {
                setCurrentCount(finalTarget);
                clearInterval(timer);
            } else {
                setCurrentCount(current);
            }
        }, 20);
    };

    useEffect(() => {
        if (!countRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCount(target);
                observer.unobserve(countRef.current); // Stop observing after starting
            }
        }, { threshold: 0.5 });

        observer.observe(countRef.current);

        return () => {
            if (countRef.current) observer.unobserve(countRef.current);
        };
    }, [target]);

    const formattedCount = isPercentage ? `${currentCount}%` : currentCount.toLocaleString();

    return (
        <div className="stat-item" ref={countRef}>
            <div className="stat-number">{formattedCount}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <div className="stats-grid">
            {STATS_DATA.map((stat, index) => (
                <StatItem key={index} target={stat.target} label={stat.label} isPercentage={stat.isPercentage} />
            ))}
        </div>
    );
};

export default StatsCounter;