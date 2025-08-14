import { useState } from "react";

const EditElements = ({ elements, setElements }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSelect = (id) => {
    setSelectedId(id);
    const el = elements.find((e) => e.id === id);
    if (el) {
      setFormData({ ...el });
    } else {
      setFormData({});
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    if (selectedId !== null) {
      setElements((prev) =>
        prev.map((el) =>
          el.id === selectedId ? { ...el, ...formData } : el
        )
      );
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Edit Elements</h2>

      {/* Dropdown for selecting element */}
      <select
        className="w-full p-2 border rounded mb-2"
        value={selectedId || ""}
        onChange={(e) => handleSelect(Number(e.target.value))}
      >
        <option value="">Select Element</option>
        {elements.map((el) => (
          <option key={el.id} value={el.id}>
            {el.type} (ID: {el.id})
          </option>
        ))}
      </select>

      {selectedId && (
        <div className="space-y-3">
          <h3 className="font-medium">
            Editing: {formData.type} (ID: {formData.id})
          </h3>

          {/* Navbar
          {formData.type === "navbar" && (
            <input
              type="text"
              value={formData.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Navbar Title"
              className="border p-2 rounded w-full"
            />
          )} */}

          {/* Hero */}
          {formData.type === "hero" && (
            <>
              <input
                type="text"
                value={formData.heading || ""}
                onChange={(e) => handleChange("heading", e.target.value)}
                placeholder="Hero Heading"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={formData.subheading || ""}
                onChange={(e) => handleChange("subheading", e.target.value)}
                placeholder="Hero Subheading"
                className="border p-2 rounded w-full"
              />
            </>
          )}

          {/* Address Form */}
{formData.type === "addressForm" && (
  <>
    <input
      type="text"
      value={formData.addressLine1 || ""}
      onChange={(e) => handleChange("addressLine1", e.target.value)}
      placeholder="Address Line 1"
      className="border p-2 rounded w-full"
    />
    <input
      type="text"
      value={formData.city || ""}
      onChange={(e) => handleChange("city", e.target.value)}
      placeholder="City"
      className="border p-2 rounded w-full"
    />
    <input
      type="text"
      value={formData.pincode || ""}
      onChange={(e) => handleChange("pincode", e.target.value)}
      placeholder="Pincode"
      className="border p-2 rounded w-full"
    />
  </>
)}


          {/* Product Card */}
{formData.type === "productCard" && (
  <>
    <input
      type="text"
      value={formData.title || ""}
      onChange={(e) => handleChange("title", e.target.value)}
      placeholder="Product Title"
      className="border p-2 rounded w-full mb-2"
    />
    <input
      type="number"
      value={formData.price || ""}
      onChange={(e) => handleChange("price", e.target.value)}
      placeholder="Price"
      className="border p-2 rounded w-full mb-2"
    />
    <input
      type="text"
      value={formData.image || ""}
      onChange={(e) => handleChange("image", e.target.value)}
      placeholder="Image URL"
      className="border p-2 rounded w-full mb-2"
    />
    <input
      type="text"
      value={formData.buttonText || ""}
      onChange={(e) => handleChange("buttonText", e.target.value)}
      placeholder="Button Text"
      className="border p-2 rounded w-full"
    />
  </>
)}


          {/* Product Grid */}
{formData.type === "productGrid" && (
  <>
    <input
      type="text"
      value={formData.title || ""}
      onChange={(e) => handleChange("title", e.target.value)}
      placeholder="Grid Title"
      className="border p-2 rounded w-full mb-2"
    />

    {(formData.products || []).map((prod, idx) => (
      <div key={idx} className="p-2 border rounded mb-2">
        <input
          type="text"
          value={prod.title || ""}
          onChange={(e) => {
            const updated = [...(formData.products || [])];
            updated[idx] = { ...updated[idx], title: e.target.value };
            handleChange("products", updated);
          }}
          placeholder="Product Title"
          className="border p-2 rounded w-full mb-1"
        />
        <input
          type="number"
          value={prod.price || ""}
          onChange={(e) => {
            const updated = [...(formData.products || [])];
            updated[idx] = { ...updated[idx], price: e.target.value };
            handleChange("products", updated);
          }}
          placeholder="Price"
          className="border p-2 rounded w-full mb-1"
        />
        <input
          type="text"
          value={prod.image || ""}
          onChange={(e) => {
            const updated = [...(formData.products || [])];
            updated[idx] = { ...updated[idx], image: e.target.value };
            handleChange("products", updated);
          }}
          placeholder="Image URL"
          className="border p-2 rounded w-full mb-1"
        />
        <button
          onClick={() => {
            const updated = formData.products.filter((_, i) => i !== idx);
            handleChange("products", updated);
          }}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Remove Product
        </button>
      </div>
    ))}

    <button
      onClick={() => {
        handleChange("products", [
          ...(formData.products || []),
          { title: "", price: "", image: "" },
        ]);
      }}
      className="bg-blue-500 text-white p-2 rounded mt-2"
    >
      Add Product
    </button>
  </>
)}


          {/* Buy Now */}
          {formData.type === "buyNow" && (
            <input
              type="text"
              value={formData.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Button Text"
              className="border p-2 rounded w-full"
            />
          )}

          {/* Add to Cart */}
          {formData.type === "addToCart" && (
            <input
              type="text"
              value={formData.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Button Text"
              className="border p-2 rounded w-full"
            />
          )}

          {/* Price */}
          {formData.type === "price" && (
            <input
              type="number"
              value={formData.amount || ""}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="Price Amount"
              className="border p-2 rounded w-full"
            />
          )}

          {/* Search Bar */}
{formData.type === "search" && (
  <input
    type="text"
    value={formData.placeholder || ""}
    onChange={(e) => handleChange("placeholder", e.target.value)}
    placeholder="Search Bar Placeholder"
    className="border p-2 rounded w-full"
  />
)}

{/* Categories */}
{formData.type === "category" && (
  <>
    <input
      type="text"
      value={formData.title || ""}
      onChange={(e) => handleChange("title", e.target.value)}
      placeholder="Categories Title"
      className="border p-2 rounded w-full"
    />
    <textarea
      value={formData.items ? formData.items.join(", ") : ""}
      onChange={(e) =>
        handleChange(
          "items",
          e.target.value.split(",").map(item => item.trim())
        )
      }
      placeholder="Category Items (comma separated)"
      className="border p-2 rounded w-full"
    />
  </>
)}

{/* Rating */}
{formData.type === "rating" && (
  <>
    <input
      type="text"
      value={formData.stars || ""}
      onChange={(e) => handleChange("stars", e.target.value)}
      placeholder="Rating (e.g. ★★★★☆)"
      className="border p-2 rounded w-full"
    />
  </>
)}


          {/* Discount */}
          {formData.type === "discount" && (
            <input
              type="text"
              value={formData.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Discount Text"
              className="border p-2 rounded w-full"
            />
          )}
          {formData.type === "footer" && (
            <input
              type="text"
              value={formData.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              className="border p-2 rounded w-full"
            />
          )}
          {/* Cart Icon */}
{formData.type === "cartIcon" && (
  <>
    <input
      type="text"
      value={formData.text || ""}
      onChange={(e) => handleChange("text", e.target.value)}
      placeholder="Cart text (e.g., Cart (0))"
      className="border p-2 rounded w-full"
    />
  </>
)}


          {/* Fallback */}
          {![
            "navbar",
            "hero",
            "cartIcon",
            "search",
            "rating",
            "addressForm",
            "category",
            "productCard",
            "productGrid",
            "buyNow",
            "addToCart",
            "price",
            "discount",
            "footer",
          ].includes(formData.type) && (
            <p className="text-gray-500">
              Editing not supported for this element type.
            </p>
          )}

          <button
            onClick={handleUpdate}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Update Element
          </button>
        </div>
      )}
    </div>
  );
};

export default EditElements;
