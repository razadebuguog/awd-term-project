import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FileText, AlignLeft } from 'lucide-react';

const TextToPdf = () => {
  const { theme } = useTheme();
  const [text, setText] = useState('Paste or type any text here to simulate exporting to PDF.');

  const isDark = theme === 'dark';

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estimatedPages = Math.max(1, Math.ceil(charCount / 1200));

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'} transition-colors duration-300`}>
      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={`mb-8 p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <div className="flex items-center mb-4">
              <FileText className="text-[#3B82F6] mr-3" size={32} />
              <h1 className={`text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                Text to PDF
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'} mb-4`}>
              Type content and see basic statistics that would be useful when exporting to PDF,
              such as word count and estimated page count.
            </p>
          </div>

          <div className={`p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                  Text Input
                </h2>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={10}
                  className={`w-full text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#3B82F6] outline-none p-3 ${
                    isDark ? 'bg-[#020617] text-[#E2E8F0] border-[#334155]' : 'bg-white text-[#0F172A]'
                  }`}
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#BFDBFE] dark:border-[#1E293B] flex flex-col justify-between">
                <div>
                  <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                    PDF Stats
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Characters: <span className="font-semibold">{charCount}</span>
                  </p>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Words: <span className="font-semibold">{wordCount}</span>
                  </p>
                  <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Estimated pages: <span className="font-semibold">{estimatedPages}</span>
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <AlignLeft className="w-4 h-4 mr-2 text-[#3B82F6]" />
                  <span className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                    In a real app, this text would be laid out into a paginated PDF.
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

export default TextToPdf;
