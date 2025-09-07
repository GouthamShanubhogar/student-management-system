// src/components/ui/Card.js
import React from 'react';

const Card = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg cursor-pointer transition"
    >
      {children}
    </div>
  );
};

export default Card;
