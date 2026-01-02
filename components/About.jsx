'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeContext';
import { Zap, Lock, Feather, ArrowRight } from 'lucide-react';

const COLOR_LIGHT_BG = '#F9FAFB';
const COLOR_DARK_BG = '#0F172A';
const COLOR_ACCENT = '#06B6D4';
const COLOR_DARK_TEXT = '#1E293B';
const COLOR_MUTED = '#64748B';
const COLOR_WHITE = '#FFFFFF';

const teamMembers = [
  {
    name: 'Mohsin Raza',
    role: 'Lead Developer & Architect',
    bio: 'Driving the core technology and conversion engine for unparalleled speed and accuracy.',
    image: 'https://placehold.co/128x128/06B6D4/FFFFFF?text=MR',
  },
  {
    name: 'Abdur Rafay',
    role: 'Product Manager & UX Lead',
    bio: 'Focusing on user experience, feature prioritization, and seamless document flow.',
    image: 'https://placehold.co/128x128/06B6D4/FFFFFF?text=AR',
  },
  {
    name: 'Choudary Shehzad',
    role: 'Security & Quality Assurance',
    bio: 'Ensuring rigorous testing and maintaining the highest standards for data privacy and security.',
    image: 'https://placehold.co/128x128/06B6D4/FFFFFF?text=CS',
  },
];

const AboutHeader = ({ textColor, accentColor, bgColor }) => (
  <div className="pt-32 pb-16 text-center transition-colors duration-300" style={{ backgroundColor: bgColor }}>
    <h1 className="text-6xl font-extrabold mb-4 tracking-tight" style={{ color: textColor }}>
      Our Mission
    </h1>
    <p className="text-xl max-w-3xl mx-auto" style={{ color: accentColor }}>
      Empowering professionals and individuals with the fastest, most reliable document
      conversion tools available.
    </p>
  </div>
);

const CoreValues = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? COLOR_LIGHT_BG : COLOR_DARK_TEXT;
  const mutedColor = COLOR_MUTED;

  const values = [
    {
      icon: Zap,
      title: 'Efficiency',
      description:
        'Streamlining your workflow is our top priority. We convert files instantly so you can focus on what matters.',
    },
    {
      icon: Lock,
      title: 'Security',
      description:
        'Your privacy is paramount. Files are processed with E2E encryption and deleted immediately after conversion.',
    },
    {
      icon: Feather,
      title: 'Simplicity',
      description:
        'Complex conversions should feel effortless. Our interface is clean, intuitive, and easy for everyone.',
    },
  ];

  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: isDarkMode ? COLOR_DARK_BG : COLOR_WHITE }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: textColor }}>
          Our <span style={{ color: COLOR_ACCENT }}>Core Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: isDarkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG,
                boxShadow: isDarkMode
                  ? '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
                  : '0 10px 20px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <value.icon className="mx-auto mb-5" size={48} strokeWidth={1.5} style={{ color: COLOR_ACCENT }} />
              <h3 className="text-2xl font-bold mb-3" style={{ color: textColor }}>
                {value.title}
              </h3>
              <p className="text-base" style={{ color: mutedColor }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? COLOR_LIGHT_BG : COLOR_DARK_TEXT;
  const mutedColor = COLOR_MUTED;

  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: isDarkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: textColor }}>
          Meet the <span style={{ color: COLOR_ACCENT }}>Team</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center p-6 rounded-xl transition-all duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/128x128/94A3B8/0F172A?text=User';
                }}
              />
              <h3 className="text-xl font-bold" style={{ color: textColor }}>
                {member.name}
              </h3>
              <p className="text-sm font-medium mb-2" style={{ color: COLOR_ACCENT }}>
                {member.role}
              </p>
              <p className="text-sm" style={{ color: mutedColor }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const bgColor = isDarkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG;
  const textColor = isDarkMode ? COLOR_LIGHT_BG : COLOR_DARK_TEXT;

  return (
    <div
      className={`min-h-screen font-inter transition-colors duration-300`}
      style={{ backgroundColor: bgColor }}
    >
      <AboutHeader
        textColor={textColor}
        accentColor={COLOR_ACCENT}
        bgColor={bgColor}
      />
      <CoreValues />
      <TeamSection />

      <section
        className="py-16 md:py-24 text-center"
        style={{ backgroundColor: isDarkMode ? COLOR_DARK_BG : COLOR_WHITE }}
      >
        <h2
          className="text-3xl sm:text-4xl font-bold mb-6 max-w-3xl mx-auto"
          style={{ color: textColor }}
        >
          Ready to Experience Seamless Document Flow?
        </h2>
        <Link
          href="/services"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white rounded-full shadow-lg transition duration-300 transform hover:scale-[1.05] mt-4"
          style={{
            backgroundColor: COLOR_ACCENT,
            boxShadow: `0 10px 15px -3px ${COLOR_ACCENT}40`,
          }}
        >
          Explore Our Services
          <ArrowRight className="ml-3 w-5 h-5" />
        </Link>
      </section>
    </div>
  );
};

export default About;
