'use client';

import React from 'react';
import Navbar from './Navbar';
import { ThemeProvider } from './ThemeContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
