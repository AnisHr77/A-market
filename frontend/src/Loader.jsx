// src/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div className="custom-loader"></div>
        </div>
    );
};

export default Loader;
