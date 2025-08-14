import { useDrag } from 'react-dnd';

const DraggableElement = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`border p-2 rounded cursor-move text-center bg-white shadow hover:bg-gray-50 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {label}
    </div>
  );
};

const AddElements = () => {
  const elements = [
    { type: 'hero', label: 'Hero Banner' },
    { type: 'productCard', label: 'Product Card' },
    { type: 'productGrid', label: 'Product Grid' },
    { type: 'addToCart', label: 'Add to Cart Button' },
    { type: 'buyNow', label: 'Buy Now Button' },
    { type: 'search', label: 'Search Bar' },
    { type: 'category', label: 'Category Section' },
    { type: 'rating', label: 'Ratings' },
    { type: 'price', label: 'Price Tag' },
    { type: 'discount', label: 'Offer/Discount Badge' },
    { type: 'footer', label: 'Footer' },
    { type: 'addressForm', label: 'Address Form' },
    { type: 'cartIcon', label: 'Cart Icon' },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add E-Commerce Elements</h2>
      <div className="space-y-2 max-h-[90vh] overflow-y-auto pr-1">
        {elements.map((el, index) => (
          <DraggableElement key={index} type={el.type} label={el.label} />
        ))}
      </div>
    </div>
  );
};

export default AddElements;