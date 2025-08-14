import React from "react";
import Navbar from "../components/navber.jsx";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <Navbar />

      <div className="mt-10 max-w-4xl mx-auto text-gray-800 px-6">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
          What Can You Do Here?
        </h2>

        <p className="text-lg leading-relaxed mb-8 text-center text-gray-700">
          This web application allows users to
          <span className="text-blue-600 font-semibold"> fully customize frontend UI designs </span>
          with live preview and instant code export.
        </p>

        <div className="bg-white shadow-2xl rounded-xl p-8 border border-gray-300">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">
            🎯 Key Features:
          </h3>

          <ul className="list-disc ml-6 space-y-4 text-gray-700 text-[1.05rem]">
            <li>Create, edit, and manage your own frontend UI templates easily.</li>
            <li>
              Customize elements like: 
              <span className="text-blue-700 font-semibold"> buttons</span>, 
              <span className="text-blue-700 font-semibold"> input fields</span>, 
              <span className="text-blue-700 font-semibold"> headings</span>, 
              <span className="text-blue-700 font-semibold"> paragraphs</span>, 
              <span className="text-blue-700 font-semibold"> cards</span>, 
              <span className="text-blue-700 font-semibold"> images</span>, and more.
            </li>
            <li>
              Modify styles like 
              <span className="text-blue-700 font-semibold"> color</span>, 
              <span className="text-blue-700 font-semibold"> font</span>, 
              <span className="text-blue-700 font-semibold"> border</span>, 
              <span className="text-blue-700 font-semibold"> spacing</span>, and 
              <span className="text-blue-700 font-semibold"> alignment</span>.
            </li>
            <li>
              Get instant results using the responsive 
              <span className="text-blue-700 font-semibold"> live preview canvas</span>.
            </li>
            <li>
              Save designs and export 
              <span className="text-blue-700 font-semibold"> HTML, CSS, JS code</span> in one click.
            </li>
            <li>
              Designed for students, developers, and designers for quick prototyping.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
