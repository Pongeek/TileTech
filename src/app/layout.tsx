import '@/styles/globals.css';
import { Metadata } from 'next';
import { Viewport } from 'next';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C66',
};

export const metadata: Metadata = {
  title: 'TileTech | שירותי אריחים מקצועיים בישראל',
  description: 'שירותי התקנת אריחים מקצועיים ברמה גבוהה - ריצוף בתים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  keywords: 'אריחים, התקנת אריחים, ריצוף, חיפוי, פסיפס, שיפוץ, מטבח, חדר אמבטיה, ישראל',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <Script id="schema-local-business" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "TileTech",
              "image": "https://www.example.com/logo.png",
              "url": "https://www.example.com",
              "telephone": "050-1234567",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "תל אביב",
                "addressCountry": "IL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "32.0853",
                "longitude": "34.7818"
              },
              "priceRange": "₪₪",
              "openingHours": "Mo-Fr 08:00-18:00",
              "description": "שירותי התקנת אריחים מקצועיים באיכות גבוהה - ריצוף בתים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית",
              "sameAs": [
                "https://www.facebook.com/tiletech",
                "https://www.instagram.com/tiletech"
              ]
            }
          `}
        </Script>
      </head>
      <body className="font-assistant">
        {children}
      </body>
    </html>
  );
} 