'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">הדף לא נמצא</h2>
        
        <p className="text-gray-600 mb-8">
          מצטערים, נראה שהדף שחיפשת לא קיים או הוסר.
          נסה לחזור לדף הבית ולנסות שוב.
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