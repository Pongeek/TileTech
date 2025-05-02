import '@/styles/globals.css';
import { Metadata } from 'next';
import { Viewport } from 'next';
import Script from 'next/script';
import { AnalyticsProvider } from '@/utils/analytics';
import { frankRuhlLibre, heebo, assistant } from './fonts';
import FeedbackProvider from '@/providers/FeedbackProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C66',
  maximumScale: 5,
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
      className={`${frankRuhlLibre.variable} ${heebo.variable} ${assistant.variable} js-focus-visible`}
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
        
        <Script id="focus-visible-polyfill" strategy="afterInteractive">
          {`
            !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var t=!0,n=!1,o=null,i={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function r(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function a(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function d(e){t=!1}function u(){document.addEventListener("mousemove",c),document.addEventListener("mousedown",c),document.addEventListener("mouseup",c),document.addEventListener("pointermove",c),document.addEventListener("pointerdown",c),document.addEventListener("pointerup",c),document.addEventListener("touchmove",c),document.addEventListener("touchstart",c),document.addEventListener("touchend",c)}function c(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,document.removeEventListener("mousemove",c),document.removeEventListener("mousedown",c),document.removeEventListener("mouseup",c),document.removeEventListener("pointermove",c),document.removeEventListener("pointerdown",c),document.removeEventListener("pointerup",c),document.removeEventListener("touchmove",c),document.removeEventListener("touchstart",c),document.removeEventListener("touchend",c))}document.addEventListener("keydown",function(n){n.metaKey||n.altKey||n.ctrlKey||(r(e.activeElement)&&a(e.activeElement),t=!0)},!0),document.addEventListener("mousedown",d,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("touchstart",d,!0),document.addEventListener("visibilitychange",function(e){"hidden"===document.visibilityState&&(n&&(t=!0),u())},!0),u(),e.addEventListener("focus",function(e){var n,o,d;r(e.target)&&(t||(n=e.target,o=n.type,"INPUT"===(d=n.tagName)&&i[o]&&!n.readOnly||"TEXTAREA"===d&&!n.readOnly||n.isContentEditable))&&a(e.target)},!0),e.addEventListener("blur",function(e){r(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(o),o=window.setTimeout(function(){n=!1},100),e.target.classList.remove("focus-visible"),e.target.removeAttribute("data-focus-visible-added"))},!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(e){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!=typeof document&&e(document)});
          `}
        </Script>
      </head>
      <body className="font-assistant">
        <a href="#main-content" className="skip-link">
          דילוג לתוכן העיקרי
        </a>
        
        <FeedbackProvider>
          {children}
        </FeedbackProvider>
        
        <AnalyticsProvider />
      </body>
    </html>
  );
} 