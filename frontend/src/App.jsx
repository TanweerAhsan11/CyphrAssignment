// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Test from './pages/Test'
import CameraPermission from './components/CameraPermission'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/cameraPermission" element={<CameraPermission/>} />
      </Routes>
    </Router>

  );
}

export default App;
