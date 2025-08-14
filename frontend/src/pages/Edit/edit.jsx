import React, { useState, useEffect } from 'react';
import Select from './Select';
import AddElements from './AddElements';
import EditElements from './EditElements';
import DeleteElements from './DeleteElements';
import SaveCanvas from './SaveCanvas';
import Canvas from './canvas';

const Edit = () => {
  const [selectedPanel, setSelectedPanel] = useState('add');
  const [elements, setElements] = useState([]);

  // Load saved design when component mounts
  useEffect(() => {
    const savedDesign = JSON.parse(localStorage.getItem("activeDesign"));
    if (savedDesign) {
      try {
        // Try to parse design_data first (for editable elements)
        if (savedDesign.design_data) {
          const parsedElements = JSON.parse(savedDesign.design_data);
          setElements(parsedElements);
        }
        // If no design_data but has html_content, create a basic element
        else if (savedDesign.html_content) {
          setElements([{
            id: Date.now(),
            type: 'customHTML',
            content: savedDesign.html_content
          }]);
        }
      } catch (error) {
        console.error("Error loading design:", error);
      }
    }
    
    return () => localStorage.removeItem("activeDesign");
  }, []);

  const renderPanel = () => {
    switch (selectedPanel) {
      case 'add':
        return <AddElements setElements={setElements} />;
      case 'edit':
        return <EditElements elements={elements} setElements={setElements} />;
      case 'delete':
        return <DeleteElements elements={elements} setElements={setElements} />;
      case 'save':
        return <SaveCanvas elements={elements} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6 border-r">
        <Select setSelectedPanel={setSelectedPanel} />
      </div>
      <div className="w-1/4 border-r p-4">
        {renderPanel()}
      </div>
      <div className="flex-1 p-4">
        <Canvas elements={elements} setElements={setElements} />
      </div>
    </div>
  );
};

export default Edit;