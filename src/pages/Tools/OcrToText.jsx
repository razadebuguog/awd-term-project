import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { BookOpen, UploadCloud, Type, Wand2 } from 'lucide-react';

const OcrToText = () => {
  const { theme } = useTheme();
  const [fileName, setFileName] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [confidence, setConfidence] = useState(0);

  const isDark = theme === 'dark';

  const handleExtract = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    // Frontend-only: fake OCR text based on file name
    const baseText = `Sample text extracted from ${fileName}. This is a simulated OCR result for the assignment.`;
    setExtractedText(baseText);
    setConfidence(92);
  };

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'} transition-colors duration-300`}>
      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={`mb-8 p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <div className="flex items-center mb-4">
              <BookOpen className="text-[#06B6D4] mr-3" size={32} />
              <h1 className={`text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                OCR PDF to Text
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'} mb-4`}>
              Demonstration of extracting text from a scanned PDF. This tool generates a static
              example text and confidence score on the frontend only.
            </p>
          </div>

          <div className={`p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <form onSubmit={handleExtract} className="space-y-4">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                Scanned PDF / Image File Name
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g. invoice-scan.pdf"
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
                  Run OCR
                  <Wand2 className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-4 rounded-xl border border-dashed border-[#CBD5F5] dark:border-[#1E293B]">
                <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                  Extracted Text
                </h2>
                {extractedText ? (
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isDark ? 'text-[#E2E8F0]' : 'text-[#0F172A]'}`}>
                    {extractedText}
                  </p>
                ) : (
                  <p className={`text-sm italic ${isDark ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                    Provide a file name and run OCR to see a sample extracted text.
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#CBD5F5] dark:border-[#1E293B] flex flex-col justify-between">
                <div>
                  <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                    OCR Summary
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    File: <span className="font-medium">{fileName || '—'}</span>
                  </p>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Confidence: <span className="font-semibold">{confidence || '--'}%</span>
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Type className="w-4 h-4 mr-2 text-[#06B6D4]" />
                  <span className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                    In a real app, this text could be copied, edited, or exported.
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

export default OcrToText;
