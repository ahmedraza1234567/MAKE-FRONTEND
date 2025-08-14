import { Routes, Route } from "react-router-dom";
import Signup from "./pages/authontication/Signup";
import Login from "./pages/authontication/login";
import About from "./pages/about";
import Home from "./pages/Home"; 
import Edit from "./pages/Edit/edit";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
