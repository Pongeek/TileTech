import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContactButton from '../ui/FloatingContactButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Layout; 