import '@/styles/globals.css';
import { Metadata } from 'next';
import { Viewport } from 'next';
import Script from 'next/script';
import { AnalyticsProvider } from '@/utils/analytics';
import { frankRuhlLibre, heebo, assistant } from './fonts';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C66',
};

export const metadata: Metadata = {
  title: 'TileTech | שירותי התקנת אריחים מקצועיים בישראל',
  description: 'חברת TileTech מתמחה בהתקנת אריחים, ריצוף וחיפוי באיכות גבוהה לפרויקטים ביתיים ומסחריים. קבלו הצעת מחיר בחינם!',
  keywords: 'אריחים, התקנת אריחים, ריצוף, חיפוי, פסיפס, שיפוץ, מטבח, חדר אמבטיה, ישראל, מרכז והשפלה, שירותי אריחים, שיפוצים, חיפוי קירות, ריצוף רצפה, בתים פרטיים, דירות',
  authors: [{ name: 'TileTech', url: 'https://www.tiletech.co.il' }],
  creator: 'TileTech',
  publisher: 'TileTech',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL('https://www.tiletech.co.il'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://www.tiletech.co.il',
    title: 'TileTech | שירותי אריחים מקצועיים בישראל',
    description: 'שירותי התקנת אריחים מקצועיים ברמה גבוהה - ריצוף בתים, שיפוץ מטבחים וחדרי אמבטיה. איכות עבודה מובטחת.',
    siteName: 'TileTech',
    images: [
      {
        url: 'https://www.tiletech.co.il/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TileTech - שירותי אריחים מקצועיים',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TileTech | שירותי אריחים מקצועיים',
    description: 'שירותי התקנת אריחים מקצועיים ברמה גבוהה בכל אזור המרכז והשפלה',
    images: ['https://www.tiletech.co.il/images/twitter-card.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="he" 
      dir="rtl" 
      className={`${frankRuhlLibre.variable} ${heebo.variable} ${assistant.variable}`}
    >
      <head>
        <Script id="schema-local-business" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "TileTech",
              "alternateName": "טייל-טק",
              "image": "https://www.tiletech.co.il/images/logo.png",
              "logo": "https://www.tiletech.co.il/images/logo.png",
              "url": "https://www.tiletech.co.il",
              "telephone": "050-1234567",
              "email": "info@tiletech.co.il",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "מרכז והשפלה",
                "addressCountry": "IL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "32.0853",
                "longitude": "34.7818"
              },
              "priceRange": "₪₪",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Friday",
                  "opens": "09:00",
                  "closes": "13:00"
                }
              ],
              "description": "שירותי התקנת אריחים מקצועיים באיכות גבוהה - ריצוף בתים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "32.0853",
                  "longitude": "34.7818"
                },
                "geoRadius": "50000"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "32.0853",
                  "longitude": "34.7818"
                },
                "geoRadius": "50000"
              },
              "sameAs": [
                "https://www.facebook.com/tiletech",
                "https://www.instagram.com/tiletech"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "שירותי אריחים",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "התקנת אריחים",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "ריצוף בתים פרטיים"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "חיפוי קירות"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "עבודות פסיפס מותאמות אישית"
                        }
                      }
                    ]
                  }
                ]
              }
            }
          `}
        </Script>
      </head>
      <body className="font-assistant">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
} 