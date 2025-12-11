import React from 'react';

const teamMembers = [
   
    { name: "Momen Hesham", role: "Founder & Leader", desc: " Visionary front-end developer leading the team with creativity and dedication", bgClass: "hover-card" },
    { name: "Ahmed Abo-Elyazeed", role: "Front-End Developer", desc: "Crafting seamless user interfaces and bringing designs to life with precision.", bgClass: "hover-card bg-medium" },
    { name: "Mohab Nayel", role: "  Front-End Developer", desc: "responsive, and interactive web experiences.", bgClass: "hover-card bg-darker" },
    { name: "Nada Tarek", role: " Front-End Developer", desc: "Building intuitive and engaging interfaces to enhance user experience.", bgClass: "hover-card bg-medium" },
    { name: "Shrouk Samy", role: " Front-End Developer", desc: "Turning creative ideas into functional and visually stunning web components.", bgClass: "hover-card bg-medium" },

];

const TeamGrid = () => {
    return (
        <div className="team-grid">
            {teamMembers.map((member, index) => (
                <div key={index} className={`team-card ${member.bgClass}`}>
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                    <p className="desc">{member.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default TeamGrid;