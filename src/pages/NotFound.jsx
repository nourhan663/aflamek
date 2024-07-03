import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-red-900 h-[70vh] flex justify-center items-center flex-col font-bold text-3xl">
      <h1>404</h1>
      <h1 className="mt-8">PAGE NOT FOUND</h1>
      <button
        className="btn btn-outline btn-error btn-md mt-10 h-10"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default NotFound;
