import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus, FaUserTimes, FaSignOutAlt } from "react-icons/fa";

function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData?.username) {
        navigate("/login");
        return;
      }

      setUsername(userData.username);
      setEmail(userData.email);

      try {
        const response = await fetch(`http://localhost:8000/user-designs/${userData.email}`);
        const data = await response.json();
        console.log("Designs data:", data); // Debug log
        setDesigns(data.designs || []);
      } catch (err) {
        console.error("Error fetching designs:", err);
        alert("Failed to load designs");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCreateFrontend = () => {
    navigate("/edit");
  };

  const handleContinueEdit = (design) => {
    localStorage.setItem("activeDesign", JSON.stringify(design));
    navigate("/edit");
  };

  const handleDeleteDesign = async (designId, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this design?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/delete-design/${designId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setDesigns(designs.filter(design => design._id !== designId));
        alert(data.message);
      } else {
        alert(data.message || "Failed to delete design");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting design");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account and all designs?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:8000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.removeItem("user");
        navigate("/signup");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Error deleting account.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-600 py-4 px-6 shadow-md flex items-center justify-between">
        <h1 className="text-white text-2xl sm:text-3xl font-bold">Welcome, {username}!</h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCreateFrontend}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition flex items-center gap-2"
          >
            <FaPlus /> New Design
          </button>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
          >
            <FaUserTimes /> Delete Account
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Welcome message */}
      <div className="p-8 text-center">
        <p className="text-lg text-gray-700 font-semibold">
          You have successfully logged in. Explore your dashboard or continue editing your saved designs.
        </p>
      </div>

      {/* Saved Designs */}
      <div className="px-4 sm:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📂 Your Saved Designs
        </h2>

        {designs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No saved designs yet.</p>
            <p className="text-sm text-gray-400">Start creating and save them here!</p>
            <button
              onClick={handleCreateFrontend}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Design
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((design) => (
              <div
                key={design._id}
                onClick={() => handleContinueEdit(design)}
                className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group relative cursor-pointer"
              >
                {/* Delete button */}
                <button
                  onClick={(e) => handleDeleteDesign(design._id, e)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition z-10"
                  title="Delete Design"
                >
                  <FaTrash className="text-sm" />
                </button>

                {/* Design Preview */}
                <div className="h-40 flex items-center justify-center bg-gray-100 relative">
                  {design.html_content ? (
                    <div 
                      className="w-full h-full overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: design.html_content }}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Preview Available</span>
                  )}
                </div>

                {/* Design Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {design.design_name || "Untitled Design"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {design.created_at ? new Date(design.created_at).toLocaleString() : "Unknown date"}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueEdit(design);
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;