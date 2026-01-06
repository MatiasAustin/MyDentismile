import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AIChatWidget } from './components/AIChatWidget';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/Services';
import { AboutPage } from './pages/About';
import { LocationsPage } from './pages/Locations';
import { ContactPage } from './pages/Contact';
import { PageView } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'services':
        return <ServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'locations':
        return <LocationsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="text-slate-900 bg-white">
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        <div className="animate-in fade-in duration-500">
          {renderPage()}
        </div>
      </Layout>
      <AIChatWidget />
    </div>
  );
};

export default App;