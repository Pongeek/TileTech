import React from 'react';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">שגיאת שרת</h2>
        
        <p className="text-gray-600 mb-8">
          מצטערים, התרחשה שגיאה בשרת.
          אנא נסה שוב מאוחר יותר או צור קשר אם הבעיה נמשכת.
        </p>
        
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors shadow-md"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
} 