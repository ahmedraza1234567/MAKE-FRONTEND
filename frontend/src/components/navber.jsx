import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center border-b pb-4 px-6 py-4 bg-white shadow-md">
      <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide cursor-pointer" onClick={() => navigate("/")}>
        Make Frontend
      </h1>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
      >
        Login / Signup
      </button>
    </nav>
  );
};

export default Navbar;
