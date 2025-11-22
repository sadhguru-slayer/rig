// components/Divider.jsx
import React from "react";

const Divider = ({ className = "", md = true, vertical = false }) => {
  return (
    <hr
      className={`
        border-gray-300
        w-[90%]
        border-t 
        ${md ? "mx-6" : "my-2"} 
        ${className}
      `}
    />
  );
};

export default Divider;
