import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Image, UploadCloud, FileText, PlusCircle } from 'lucide-react';

const ImageToPdf = () => {
  const { theme } = useTheme();
  const [imageNames, setImageNames] = useState(['']);
  const [outputName, setOutputName] = useState('images.pdf');

  const isDark = theme === 'dark';

  const handleNameChange = (index, value) => {
    const next = [...imageNames];
    next[index] = value;
    setImageNames(next);
  };

  const addRow = () => setImageNames([...imageNames, '']);

  const nonEmptyImages = imageNames.filter((n) => n.trim());

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'} transition-colors duration-300`}>
      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={`mb-8 p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <div className="flex items-center mb-4">
              <Image className="text-[#F97316] mr-3" size={32} />
              <h1 className={`text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                Image to PDF
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'} mb-4`}>
              Demonstration of combining multiple image files into a single PDF document. This is
              a local-only simulation using file name inputs.
            </p>
          </div>

          <div className={`p-6 md:p-8 rounded-2xl shadow-xl ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
              Add Images
            </h2>
            <div className="space-y-3 mb-6">
              {imageNames.map((name, index) => (
                <div key={index} className="relative">
                  <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Image ${index + 1} (e.g. photo-${index + 1}.jpg)`}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#F97316] outline-none text-sm ${
                      isDark ? 'bg-[#020617] text-white border-[#334155]' : 'bg-white text-[#1E293B]'
                    }`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center text-sm font-medium text-[#F97316] hover:text-[#EA580C]"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add another image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl border border-dashed border-[#FED7AA] dark:border-[#1E293B]">
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                  Output PDF Name
                </h3>
                <input
                  type="text"
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#F97316] outline-none text-sm ${
                    isDark ? 'bg-[#020617] text-white border-[#334155]' : 'bg-white text-[#1E293B]'
                  }`}
                />
                <p className={`mt-2 text-xs ${isDark ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                  In a real app, clicking Export would download this combined PDF.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#FED7AA] dark:border-[#1E293B]">
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>
                  PDF Preview Summary
                </h3>
                {nonEmptyImages.length ? (
                  <p className={`text-sm ${isDark ? 'text-[#E2E8F0]' : 'text-[#0F172A]'}`}>
                    The PDF <span className="font-medium">{outputName}</span> would contain
                    <span className="font-semibold"> {nonEmptyImages.length}</span> page
                    {nonEmptyImages.length !== 1 ? 's' : ''}, one for each image listed above.
                  </p>
                ) : (
                  <p className={`text-sm italic ${isDark ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                    Add at least one image name to see a preview summary.
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

export default ImageToPdf;
