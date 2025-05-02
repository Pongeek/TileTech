import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-8 mt-0 relative -top-2">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-frank font-bold mb-4">TileTech</h2>
            <p className="font-assistant">
              שירותי התקנת אריחים מקצועיים <br />
              באיכות גבוהה ושירות אמין
            </p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-heebo font-bold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2 font-assistant">
              <li><Link href="#services" className="hover:text-accent transition-colors">שירותים</Link></li>
              <li><Link href="#gallery" className="hover:text-accent transition-colors">גלריה</Link></li>
              <li><Link href="#testimonials" className="hover:text-accent transition-colors">המלצות</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">צור קשר</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heebo font-bold mb-4">צור קשר</h3>
            <ul className="space-y-2 font-assistant">
              <li>טלפון: 050-1234567</li>
              <li>דוא"ל: info@tiletech.co.il</li>
              <li>כתובת: תל אביב, ישראל</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-4 text-center font-assistant">
          <p>&copy; {new Date().getFullYear()} TileTech. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 