import { useState } from 'react';

const DeleteElements = ({ elements, setElements }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = () => {
    if (selectedId !== null) {
      setElements((prev) => prev.filter((el) => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Delete Elements</h2>

      <select
        className="w-full p-2 border rounded mb-2"
        value={selectedId || ''}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        <option value="">Select Element</option>
        {elements.map((el) => (
          <option key={el.id} value={el.id}>
            {el.type} (ID: {el.id})
          </option>
        ))}
      </select>

      <button
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        onClick={handleDelete}
        disabled={selectedId === null}
      >
        Delete Selected Element
      </button>
    </div>
  );
};

export default DeleteElements;