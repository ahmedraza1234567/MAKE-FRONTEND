import { useDrop } from 'react-dnd';
import { useRef } from "react";
import axios from "axios";

const Canvas = ({ elements, setElements }) => {
  const canvasRef = useRef(null);

  const handleSaveDesign = async () => {
    const email = localStorage.getItem("email"); 
    const design_name = prompt("Enter a name for your design:");

    if (!email || !design_name) {
      alert("Email or Design Name missing!");
      return;
    }

    const html_content = canvasRef.current.innerHTML;

    try {
      const res = await axios.post("http://localhost:8000/save-design", {
        email,
        design_name,
        html_content,
      });

      alert(res.data.message);
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Failed to save design");
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item) => {
      const newElement = {
        id: Date.now(),
        type: item.type,
      };
      setElements((prev) => [...prev, newElement]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`h-full w-full overflow-y-auto border-2 rounded p-4 transition bg-white ${isOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'}`}
    >
      <div id="canvas-preview" ref={canvasRef}>
        {elements.length === 0 ? (
          <p className="text-gray-400">Drag elements here...</p>
        ) : (
          elements.map((el) => (
            <div key={el.id} className="mb-4 p-3 bg-gray-50 border rounded shadow-sm">


              {el.type === 'hero' && (
                <div className="bg-blue-200 p-6 rounded text-center">
                  <h1 className="text-2xl font-bold">{el.heading || 'Welcome to Our Store'}</h1>
                  <p className="text-sm">{el.subheading || 'Best products, best prices!'}</p>
                </div>
              )}

              {el.type === 'search' && (
                <input
                  type="text"
                  placeholder={el.placeholder || "Search products..."}
                  className="w-full p-2 border rounded"
                />
              )}

              {el.type === 'category' && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">{el.title || "Categories"}</h2>
                  <div className="flex gap-2">
                    {(el.items || ["Electronics", "Clothing", "Home"]).map((cat, i) => (
                      <span key={i} className="bg-blue-100 px-3 py-1 rounded">{cat}</span>
                    ))}
                  </div>
                </div>
              )}


              {el.type === 'productCard' && (
  <div className="p-4 border rounded bg-white shadow text-center">
    <img
      src={el.image || "https://via.placeholder.com/150"}
      alt="Product"
      className="mb-2 w-full rounded"
    />
    <p className="font-semibold">{el.title || 'Product Name'}</p>
    <p className="text-sm text-gray-600">₹{el.price || '99.99'}</p>
    <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
      {el.buttonText || 'Add to Cart'}
    </button>
  </div>
)}


              {el.type === 'productGrid' && (
                <div className="grid grid-cols-2 gap-4">
                 {(el.products && el.products.length > 0 ? el.products : [
                  { title: "Sample Product 1", price: 49.99, image: "https://via.placeholder.com/100" },
                  { title: "Sample Product 2", price: 59.99, image: "https://via.placeholder.com/100" }
                  ]).map((prod, i) => (
                 <div key={i} className="p-2 border rounded bg-white text-center">
                      <img
                        src={prod.image || "https://via.placeholder.com/100"}
                        className="mx-auto mb-2"
                        alt="Product"
                      />
                      <p className="text-sm">{prod.title || `Product ${i + 1}`}</p>
                      <p className="text-xs text-gray-500">${prod.price || '0.00'}</p>
                    </div>
                 ))}
                </div>
              )}


              {el.type === 'addToCart' && (
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  {el.text || 'Add to Cart'}
                </button>
              )}

              {el.type === 'buyNow' && (
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  {el.text || 'Buy Now'}
                </button>
              )}

              {el.type === 'rating' && (
                <div className="flex items-center gap-1 text-yellow-500">
                  {el.stars || '★★★★☆'}
                </div>
              )}

              {el.type === 'price' && (
                <p className="text-lg font-bold text-green-600">₹{el.amount || '99.99'}</p>
              )}

              {el.type === 'discount' && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  {el.text || '30% OFF'}
                </span>
              )}

              {el.type === 'footer' && (
                <div className="bg-gray-800 text-white text-sm p-4 rounded text-center">©  
                  {el.text || ' 2025 yourFrontend | Privacy | Contact Us'}
                </div>
              )}

              {el.type === 'addressForm' && (
                <form className="space-y-2">
                  <input
                    type="text"
                    placeholder={el.addressLine1 || "Address Line 1"}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder={el.city || "City"}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder={el.pincode || "Pincode"}
                    className="w-full p-2 border rounded"
                  />
                </form>
              )}

              {el.type === 'cartIcon' && (
                <div className="flex items-center gap-2">
                  🛒 <span className="text-sm">{el.text || 'Cart (0)'}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Canvas;
