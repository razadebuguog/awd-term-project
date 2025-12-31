import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Code, FileText } from 'lucide-react';

const HtmlToPdf = () => {
  const { theme } = useTheme();
  const [htmlInput, setHtmlInput] = useState('<h1>Hello UniConvert</h1>');

  const isDark = theme === 'dark';

  const plainText = htmlInput
    .replace(/<\/?[^>]+>/g, ' ') // strip tags
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = plainText ? plainText.split(' ').length : 0;

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'} transition-colors duration-300`}>
      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className={`mb-8 p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <div className="flex items-center mb-4">
              <Code className="text-[#8B5CF6] mr-3" size={32} />
              <h1 className={`text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                HTML to PDF
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'} mb-4`}>
              Paste any HTML snippet and see the plain-text content that would appear in a PDF.
              This is a simple frontend-only visualization.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <div>
              <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                HTML Input
              </h2>
              <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                rows={12}
                className={`w-full text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#8B5CF6] outline-none p-3 font-mono ${
                  isDark ? 'bg-[#020617] text-[#E2E8F0] border-[#334155]' : 'bg-white text-[#0F172A]'
                }`}
              />
            </div>

            <div className="flex flex-col h-full">
              <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                PDF Content Preview
              </h2>
              <div className="flex-1 p-4 rounded-xl border border-dashed border-[#DDD6FE] dark:border-[#1E293B] overflow-auto">
                {plainText ? (
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#E2E8F0]' : 'text-[#0F172A]'}`}>
                    {plainText}
                  </p>
                ) : (
                  <p className={`text-sm italic ${isDark ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                    Start typing HTML on the left to see how the text would appear in a PDF.
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                  <span className="font-medium">Word count:</span> {wordCount}
                </div>
                <div className="flex items-center text-[#8B5CF6]">
                  <FileText className="w-3 h-3 mr-1" />
                  <span>Static preview only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HtmlToPdf;
