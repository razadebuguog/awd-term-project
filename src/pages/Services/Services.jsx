import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext'; 
import {
    FileType2,
    Image,
    Code,
    BookOpen,
    Zap,
    ArrowRight,
    FileText,
    FileCheck2,
    Palette,
    DownloadCloud
} from 'lucide-react';

const conversionServices = [
    {
        title: 'PDF to Word',
        description: 'Convert any PDF file into a fully editable Microsoft Word document (.docx) with perfect formatting preservation.',
        icon: FileType2,
        link: '/tool/pdf-to-word',
        color: '#06B6D4',
    },
    {
        title: 'OCR PDF to Text',
        description: 'Extract text from scanned documents, images, and non-selectable PDFs using advanced Optical Character Recognition (OCR).',
        icon: BookOpen,
        link: '/tool/ocr-to-text',
        color: '#14B8A6',
    },
    {
        title: 'Image to PDF',
        description: 'Combine multiple images (JPEG, PNG, GIF) into a single, optimized PDF file. Ideal for archiving photos and documents.',
        icon: Image,
        link: '/tool/image-to-pdf',
        color: '#F97316',
    },
    {
        title: 'HTML to PDF',
        description: 'Turn any web page URL or raw HTML code snippet into a high-quality, printable PDF document.',
        icon: Code,
        link: '/tool/html-to-pdf',
        color: '#8B5CF6',
    },
    {
        title: 'PDF Compressor',
        description: 'Reduce the size of your PDF files without compromising document quality. Perfect for email attachments.',
        icon: DownloadCloud,
        link: '/tool/pdf-compressor',
        color: '#EC4899',
    },
    {
        title: 'Text to PDF',
        description: 'Instantly convert plain text or copy-pasted content into a formatted, clean PDF document.',
        icon: FileText,
        link: '/tool/text-to-pdf',
        color: '#3B82F6',
    },
];

const utilityServices = [
    {
        title: 'PDF Editor',
        description: 'Quickly add text, images, and shapes to your PDF documents. Basic editing features available online.',
        icon: Palette,
    },
    {
        title: 'PDF Merge',
        description: 'Easily combine two or more PDF files into one complete document in the order you specify.',
        icon: FileCheck2,
    },
];

const Services = () => {
    const { theme } = useTheme();

    const bgColor = theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]';
    const headingColor = theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#1E293B]';
    const subTextColor = theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#64748B]';
    const cardBgColor = theme === 'dark' ? 'bg-[#1E293B]' : 'bg-white';

    const ServiceCard = ({ service }) => {
        const Icon = service.icon;
        const iconColor = service.color || '#06B6D4';
        
        return (
            <Link
                to={service.link || '#'}
                className={`group block p-6 rounded-2xl ${cardBgColor} shadow-xl transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-[${iconColor}]/50`}
                style={{
                    boxShadow: theme === 'dark' ? `0 10px 15px -3px ${iconColor}40, 0 4px 6px -2px ${iconColor}10` : '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)',
                }}
            >
                <div className="flex items-center space-x-4 mb-4">
                    <Icon className="transition-colors duration-300" size={32} strokeWidth={2} style={{ color: iconColor }} />
                    <h3 className={`text-xl font-bold ${headingColor}`}>
                        {service.title}
                    </h3>
                </div>
                <p className={`${subTextColor} text-base mb-4`}>
                    {service.description}
                </p>
                <div className="mt-4 text-base font-semibold flex items-center transition-colors duration-300 group-hover:text-[#06B6D4]" style={{ color: iconColor }}>
                    Launch Tool
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
            </Link>
        );
    };

    return (
        <div className={`min-h-screen ${bgColor} transition-colors duration-300 font-inter`}>
            <main className="pt-28 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className={`text-5xl font-extrabold ${headingColor} mb-4`}>
                            All Our <span className="text-[#06B6D4]">Services</span>
                        </h1>
                        <p className={`text-xl ${subTextColor} max-w-3xl mx-auto`}>
                            Discover the complete suite of tools designed to make document conversion and management effortless and accurate.
                        </p>
                    </div>

                    <h2 className={`text-3xl font-bold ${headingColor} mb-8 border-b border-gray-200 dark:border-[#1E293B] pb-3`}>
                        Core Conversion Tools
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {conversionServices.map((service, index) => (
                            <ServiceCard key={index} service={service} />
                        ))}
                    </div>

                    <h2 className={`text-3xl font-bold ${headingColor} mb-8 border-b border-gray-200 dark:border-[#1E293B] pb-3`}>
                        Document Utility Tools
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {utilityServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div 
                                    key={index}
                                    className={`p-6 rounded-2xl ${cardBgColor} shadow-lg border-l-4 border-[#06B6D4]`}
                                >
                                    <Icon className="text-[#06B6D4] mb-3" size={30} strokeWidth={2} />
                                    <h3 className={`text-xl font-bold ${headingColor} mb-2`}>
                                        {service.title}
                                    </h3>
                                    <p className={`${subTextColor} text-base`}>
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Services;