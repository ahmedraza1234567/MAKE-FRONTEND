import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navber";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ " + data.message);
        console.log("Logged in user:", data);
        localStorage.setItem("user", JSON.stringify(data)); // Save user data
        navigate("/Home"); // redirect to home or dashboard
      } else {
        setMessage("❌ " + data.detail);
      }
    } catch (error) {
      setMessage("❌ Error logging in");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-blue-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-xl rounded-2xl border">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 pr-10"
  />
  <div
    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
  </div>
</div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 font-medium text-sm text-red-600">
            {message}
          </p>
        )}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
