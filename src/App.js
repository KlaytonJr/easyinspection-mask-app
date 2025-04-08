import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CameraMask from "./view/CameraMask";
import CameraFunction from './view/CameraFunction';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<CameraMask />} />
          <Route path="/simple-camera" element={<CameraFunction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;