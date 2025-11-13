// components/Divider.jsx
import React from "react";

const Divider = ({ className }) => {
  return <hr className={`border-t border-gray-300 my-6 ${className || ""}`} />;
};

export default Divider;
