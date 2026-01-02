'use client';

import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { DownloadCloud, Gauge } from 'lucide-react';

const PdfCompressor = () => {
  const { theme } = useTheme();
  const [fileName, setFileName] = useState('presentation.pdf');
  const [sizeKb, setSizeKb] = useState(2048);
  const [level, setLevel] = useState(40);

  const isDark = theme === 'dark';
  const compressedSize = Math.max(50, Math.round(sizeKb * (1 - level / 100)));

  return (
    <div
      className={`min-h-screen font-inter ${
        isDark ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
      } transition-colors duration-300`}
    >
      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className={`mb-8 p-6 md:p-8 rounded-2xl shadow-xl ${
              isDark ? 'bg-[#020617]' : 'bg-white'
            }`}
          >
            <div className="flex items-center mb-4">
              <DownloadCloud className="text-[#EC4899] mr-3" size={32} />
              <h1
                className={`text-3xl md:text-4xl font-extrabold ${
                  isDark ? 'text-white' : 'text-[#1E293B]'
                }`}
              >
                PDF Compressor
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'} mb-4`}>
              Adjust the compression level to see how the estimated file size would change. This is
              a purely visual demo.
            </p>
          </div>

          <div
            className={`p-6 md:p-8 rounded-2xl shadow-xl ${
              isDark ? 'bg-[#020617]' : 'bg-white'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? 'text-white' : 'text-[#1E293B]'
                  }`}
                >
                  PDF File Name
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#EC4899] outline-none text-sm ${
                    isDark ? 'bg-[#020617] text-white border-[#334155]' : 'bg-white text-[#1E293B]'
                  }`}
                />

                <label
                  className={`block text-sm font-medium mt-4 mb-1 ${
                    isDark ? 'text-white' : 'text-[#1E293B]'
                  }`}
                >
                  Original Size (KB)
                </label>
                <input
                  type="number"
                  min={50}
                  value={sizeKb}
                  onChange={(e) => setSizeKb(Number(e.target.value) || 0)}
                  className={`w-full px-3 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#EC4899] outline-none text-sm ${
                    isDark ? 'bg-[#020617] text-white border-[#334155]' : 'bg-white text-[#1E293B]'
                  }`}
                />

                <label
                  className={`block text-sm font-medium mt-4 mb-1 ${
                    isDark ? 'text-white' : 'text-[#1E293B]'
                  }`}
                >
                  Compression Level ({level}%)
                </label>
                <input
                  type="range"
                  min={10}
                  max={80}
                  step={5}
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#F9A8D4] dark:border-[#1E293B] flex flex-col justify-between">
                <div>
                  <h2
                    className={`text-lg font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-[#1E293B]'
                    }`}
                  >
                    Compression Summary
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    File: <span className="font-medium">{fileName}</span>
                  </p>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Original size: <span className="font-semibold">{sizeKb} KB</span>
                  </p>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Estimated compressed size:{' '}
                    <span className="font-semibold">{compressedSize} KB</span>
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Gauge className="w-4 h-4 mr-2 text-[#EC4899]" />
                  <span className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                    In a real app, higher compression means smaller size but lower quality.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfCompressor;
