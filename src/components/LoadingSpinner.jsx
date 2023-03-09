import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="loading-spinner"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50px",
        height: "50px",
        border: "5px solid rgba(0, 0, 0, 0.1)",
        borderTopColor: "#db5e34",
        borderRadius: "50%",
        animation: "loading 1s ease-in-out infinite",
      }}
    />
  );
};

export default LoadingSpinner;
