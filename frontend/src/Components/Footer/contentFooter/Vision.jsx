// src/pages/VisionMission.jsx
import React from 'react';
import '../contentFooter/Vision.css';

const VisionMission = () => {
    return (
        <div className="p">
            <h1 className="texth1">Our Vision & Mission</h1>
            <hr/>
<div className={"content-vision"}>
            <section className="content-text">
                <h2 className="text-xl font-semibold mb-2">Vision</h2>
                <p>
                    To become the #1 e-commerce platform in the Middle East, where innovation meets customer satisfaction.
                </p>
            </section>
<hr className="hr-vision" />
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Mission</h2>
                <p>
                    We are committed to delivering the best online shopping experience through high-quality products, competitive pricing, and outstanding customer service.
                </p>
            </section>
    <hr className="hr-vision" />
            <section>
                <h2 className="text-xl font-semibold mb-2">Our Values</h2>
                <ul className="list-disc list-inside">
                    <li>Transparency</li>
                    <li>Quality</li>
                    <li>Innovation</li>
                    <li>Customer Satisfaction</li>
                </ul>
            </section>
    <hr className="hr-vision" />
</div>
        </div>
    );
};

export default VisionMission;
