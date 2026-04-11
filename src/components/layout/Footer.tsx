import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream text-secondary border-t border-cream-muted" dir="rtl">

      {/* Main footer content */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Updated logo to match header diamond style */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10 shrink-0">
                <div className="absolute inset-0 bg-primary rotate-45 rounded-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-frank font-bold text-xs text-white leading-none relative z-10">TT</span>
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-frank font-bold leading-none">TileTech</span>
                <span className="text-[10px] font-heebo text-secondary/50 tracking-wide">ריצוף ושיפוץ</span>
              </div>
            </div>

            <p className="font-assistant text-secondary/75 text-sm leading-relaxed mb-6">
              שירותי התקנת אריחים מקצועיים באיכות גבוהה — ריצוף בתים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/tiletech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TileTech באינסטגרם"
                className="w-9 h-9 bg-secondary/10 text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/tiletech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TileTech בפייסבוק"
                className="w-9 h-9 bg-secondary/10 text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/972544727746"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TileTech בוואטסאפ"
                className="w-9 h-9 bg-secondary/10 text-secondary hover:bg-[#25D366] hover:text-white transition-colors duration-200 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 30 30">
                  <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="text-base font-frank font-bold mb-5 pb-2 border-b border-secondary/15">ניווט מהיר</h3>
            <ul className="space-y-3 font-assistant">
              {[
                { href: '#services', label: 'שירותים' },
                { href: '#projects', label: 'פרויקטים' },
                { href: '#testimonials', label: 'המלצות' },
                { href: '#contact', label: 'צור קשר' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-2 text-secondary/75 hover:text-primary transition-colors text-sm group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h3 className="text-base font-frank font-bold mb-5 pb-2 border-b border-secondary/15">שעות פעילות</h3>
            <ul className="space-y-3 font-assistant text-sm">
              <li className="flex justify-between gap-4 text-secondary/75">
                <span>ראשון – חמישי</span>
                <span className="text-secondary font-medium">09:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4 text-secondary/75">
                <span>שישי</span>
                <span className="text-secondary font-medium">09:00 – 13:00</span>
              </li>
              <li className="flex justify-between gap-4 text-secondary/75">
                <span>שבת</span>
                <span className="text-secondary/40">סגור</span>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-base font-frank font-bold mb-5 pb-2 border-b border-secondary/15">צור קשר</h3>
            <ul className="space-y-4 font-assistant text-sm">
              <li>
                <a href="tel:+972544727746" className="flex items-start gap-3 text-secondary/75 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  054-4727746
                </a>
              </li>
              <li>
                <a href="mailto:info@tiletech.co.il" className="flex items-start gap-3 text-secondary/75 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@tiletech.co.il
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary/75">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                מרכז והשפלה, ישראל
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-muted">
        <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-assistant text-secondary/50">
          <p>&copy; {currentYear} TileTech. כל הזכויות שמורות.</p>
          <p>עוצב ופותח באהבה בישראל 🇮🇱</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
