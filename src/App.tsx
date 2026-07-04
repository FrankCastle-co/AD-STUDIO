/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import InteractiveMenuSimulator from './components/InteractiveMenuSimulator';
import TemplatesPreview from './components/TemplatesPreview';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [selectedType, setSelectedType] = useState<'Pizzeria' | 'Cafétéria' | 'Restaurant' | 'Autre'>('Pizzeria');
  const [isAdminActive, setIsAdminActive] = useState<boolean>(false);

  useEffect(() => {
    // Listen to hash changes for #admin routing
    const handleHashChange = () => {
      setIsAdminActive(window.location.hash === '#admin');
    };

    // Check initial hash on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSelectTemplate = (type: 'Pizzeria' | 'Cafétéria' | 'Restaurant') => {
    setSelectedType(type);
    
    // Smooth scroll down to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminActive) {
    return (
      <AdminDashboard 
        onClose={() => {
          window.location.hash = '';
          setIsAdminActive(false);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-orange-500/30 selection:text-orange-300">
      
      {/* Premium Navigation Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero />

        {/* Core Services presentation (QR Menu, Sites, SEO) */}
        <Services />

        {/* Highly Interactive Digital Menu Simulator (Virtual Smartphone) */}
        <InteractiveMenuSimulator />

        {/* Premium Design Styles Previews */}
        <TemplatesPreview onSelectTemplate={handleSelectTemplate} />

        {/* Real Gérant reviews */}
        <Testimonials />

        {/* High Converting Pre-filled Contact and Direct Call parameters */}
        <ContactForm selectedType={selectedType} />

      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Floating Interactive WhatsApp CTA Button */}
      <WhatsAppButton />

    </div>
  );
}
