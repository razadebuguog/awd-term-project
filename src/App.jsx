import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import PdfToWord from './pages/Tools/PdfToWord';
import OcrToText from './pages/Tools/OcrToText';
import ImageToPdf from './pages/Tools/ImageToPdf';
import HtmlToPdf from './pages/Tools/HtmlToPdf';
import PdfCompressor from './pages/Tools/PdfCompressor';
import TextToPdf from './pages/Tools/TextToPdf';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Tool pages from Services */}
        <Route path="/tool/pdf-to-word" element={<PdfToWord />} />
        <Route path="/tool/ocr-to-text" element={<OcrToText />} />
        <Route path="/tool/image-to-pdf" element={<ImageToPdf />} />
        <Route path="/tool/html-to-pdf" element={<HtmlToPdf />} />
        <Route path="/tool/pdf-compressor" element={<PdfCompressor />} />
        <Route path="/tool/text-to-pdf" element={<TextToPdf />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
