'use client';

import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { FileType2, UploadCloud, FileText, ArrowRight } from 'lucide-react';

const PdfToWord = () => {
  const { theme } = useTheme();
  const [fileName, setFileName] = useState('');
  const [converted, setConverted] = useState(false);
  const [pages, setPages] = useState(1);

  const isDark = theme === 'dark';

  const handleConvert = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const estimatedPages = Math.max(1, Math.min(20, Math.ceil(fileName.length / 5)));
    setPages(estimatedPages);
    setConverted(true);
  };

  const reset = () => {
    setConverted(false);
    setPages(1);
  };

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
              <FileType2 className="text-[#06B6D4] mr-3" size={32} />
              <h1
                className={`text-3xl md:text-4xl font-extrabold ${
                  isDark ? 'text-white' : 'text-[#1E293B]'
                }`}
              >
                PDF to Word Converter
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'} mb-4`}>
              Simulate converting a PDF file into an editable Word document. This is a
              frontend-only demo – no files are actually uploaded.
            </p>
          </div>

          <div
            className={`p-6 md:p-8 rounded-2xl shadow-xl ${
              isDark ? 'bg-[#020617]' : 'bg-white'
            }`}
          >
            <form onSubmit={handleConvert} className="space-y-4">
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDark ? 'text-white' : 'text-[#1E293B]'
                }`}
              >
                PDF File Name
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => {
                      setFileName(e.target.value);
                      if (converted) reset();
                    }}
                    placeholder="e.g. report.pdf"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#06B6D4] outline-none text-sm ${
                      isDark ? 'bg-[#020617] text-white border-[#334155]' : 'bg-white text-[#1E293B]'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!fileName.trim()}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-[#06B6D4] hover:bg-[#06B6D4]/90 shadow-lg shadow-[#06B6D4]/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Convert to Word
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl border border-dashed border-[#CBD5F5] dark:border-[#1E293B]">
                <h2
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-[#1E293B]'
                  }`}
                >
                  PDF Details
                </h2>
                <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  File: <span className="font-medium">{fileName || '—'}</span>
                </p>
                <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  Estimated pages: <span className="font-medium">{pages}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#CBD5F5] dark:border-[#1E293B]">
                <h2
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-[#1E293B]'
                  }`}
                >
                  Word Output (Preview)
                </h2>
                {converted ? (
                  <div className="flex items-start space-x-3 text-sm">
                    <FileText className="w-5 h-5 mt-0.5 text-[#06B6D4]" />
                    <div className={isDark ? 'text-[#E2E8F0]' : 'text-[#0F172A]'}>
                      <p className="font-medium mb-1">
                        {fileName.replace(/\.pdf$/i, '') || 'document'} .docx
                      </p>
                      <p>
                        Your PDF has been &quot;converted&quot; into a Word document with approximately {pages}{' '}
                        page{pages !== 1 ? 's' : ''}. In a real implementation, the converted file would be
                        downloaded here.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`text-sm italic ${
                      isDark ? 'text-[#64748B]' : 'text-[#94A3B8]'
                    }`}
                  >
                    Fill in a PDF file name and click Convert to see a simulated Word output.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfToWord;
