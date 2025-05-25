import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-2 mt-0">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-frank font-bold mb-4 text-center md:text-right">TileTech</h2>
            <p className="font-assistant text-center md:text-right">
              שירותי התקנת אריחים מקצועיים <br />
              באיכות גבוהה ושירות אמין
            </p>
          </div>
          
          <div className="mb-6 md:mb-0 text-center md:text-right w-full md:w-auto">
            <h3 className="text-lg font-heebo font-bold mb-3">ניווט מהיר</h3>
            <ul className="space-y-2 font-assistant list-none p-0 ml-6 mx-auto text-center md:text-right">
              <li><Link href="#services" className="hover:text-accent transition-colors">שירותים</Link></li>
              <li><Link href="#gallery" className="hover:text-accent transition-colors">גלריה</Link></li>
              <li><Link href="#testimonials" className="hover:text-accent transition-colors">המלצות</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">צור קשר</Link></li>
            </ul>
          </div>
          
          <div className="text-center md:text-right w-full md:w-auto">
            <h3 className="text-lg font-heebo font-bold mb-3 md:text-right text-center md:mr-[40px]">צור קשר</h3>
            <ul className="space-y-2 font-assistant list-none p-0 ml-6 mx-auto text-center md:text-right">
              <li>טלפון: 054-4727746</li>
              <li>דוא"ל: info@tiletech.co.il</li>
              <li>איזור: מרכז והשפלה</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 pt-3 text-center font-assistant">
          <p>&copy; {new Date().getFullYear()} TileTech. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 