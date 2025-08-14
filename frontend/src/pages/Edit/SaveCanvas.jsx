import React from "react";

const SaveCanvas = ({ elements }) => {
  // 📌 Download HTML
  const handleDownload = () => {
    const canvasElement = document.getElementById("canvas-preview");
    if (!canvasElement) {
      alert("Canvas not found!");
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Downloaded Canvas</title>
  
  <!-- TailwindCSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    body {
      font-family: sans-serif;
      background-color: #f9f9f9;
      padding: 2rem;
    }
    .downloaded-canvas {
      border: 1px solid #ccc;
      padding: 1rem;
      background: white;
    }
  </style>
</head>
<body>
  <div class="downloaded-canvas">
    ${canvasElement.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas_design.html";
    a.click();

    URL.revokeObjectURL(url);
  };

  // 📌 Save to DB
  const handleSaveToDatabase = async () => {
    const canvasElement = document.getElementById("canvas-preview");
    if (!canvasElement) {
      alert("Failed to save canvas: not found");
      return;
    }

    const htmlContent = canvasElement.innerHTML;
    const designData = JSON.stringify(elements); // ✅ Editable data save

    try {
      const user = localStorage.getItem("user");
      const parsedata = JSON.parse(user);
      console.log("Saving design for user:", parsedata.email);

      const response = await fetch("http://localhost:8000/save-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsedata.email,
          design_name: "My Canvas Design",
          html_content: htmlContent,
          design_data: designData, // ✅ Important for editing later
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Failed to save");

      alert("Design saved successfully!");
    } catch (error) {
      alert(`Failed to save canvas: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Save & Get Code</h2>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
      >
        Download HTML File
      </button>
      <br />
      <button
        onClick={handleSaveToDatabase}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save to Database
      </button>
    </div>
  );
};

export default SaveCanvas;
