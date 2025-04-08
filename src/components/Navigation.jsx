import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', justifyContent: 'center' }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
            Camera Mask
          </Link>
        </li>
        <li>
          <Link to="/simple-camera" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
            Camera Function
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
