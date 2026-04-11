'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PhotoUpload from '@/components/ui/PhotoUpload';
import PhotoGallery from '@/components/ui/PhotoGallery';
import { usePhotos } from '@/hooks/usePhotos';

export default function PhotosPage() {
  const { photos, loading, error, fetchPhotos, deletePhoto } = usePhotos();
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadComplete = (success: boolean) => {
    if (success) {
      fetchPhotos(true);
      setShowUpload(false);
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-neutral-light pt-16" dir="rtl">
        <div className="container-custom py-10">
          <div
            className="rounded-lg border border-secondary/20 bg-secondary/5 text-secondary px-4 py-3 mb-8 text-sm font-assistant leading-relaxed"
            role="note"
          >
            כלי ניהול תמונות — מיועד לשימוש פנימי. הקפידו שלא לקשר לדף זה מהאתר הציבורי אם אינכם רוצים לחשוף אותו.
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-frank font-bold text-secondary">גלריית תמונות</h1>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fetchPhotos(true)}
                className="btn-secondary text-sm py-2 px-4"
              >
                רענון
              </button>
              <button
                type="button"
                onClick={() => setShowUpload(!showUpload)}
                className="btn-primary text-sm py-2 px-4"
              >
                {showUpload ? 'ביטול העלאה' : 'העלאת תמונה'}
              </button>
            </div>
          </div>

          {showUpload && (
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
              <PhotoUpload onUploadComplete={handleUploadComplete} />
            </div>
          )}

          {error && (
            <div
              className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 font-assistant text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <div
                className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"
                aria-hidden
              />
            </div>
          ) : (
            <PhotoGallery photos={photos} onDelete={deletePhoto} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
