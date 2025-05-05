import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/utils/cloudinary';
import { Photo } from '@/data/models/Photo';

// In a real application, this would be a database query
// For now, we're using a mock database
const mockPhotos: Photo[] = [];

// GET /api/photos/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // In a real application, this would be a database query
    const photo = mockPhotos.find(p => p.id === id);
    
    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(photo);
  } catch (error) {
    console.error('Error fetching photo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo' },
      { status: 500 }
    );
  }
}

// PATCH /api/photos/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // In a real application, this would be a database query
    const photoIndex = mockPhotos.findIndex(p => p.id === id);
    
    if (photoIndex === -1) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    // Update photo data - we only allow updating certain fields
    const updatedPhoto = {
      ...mockPhotos[photoIndex],
      ...data,
      // Prevent updating critical fields
      id: mockPhotos[photoIndex].id,
      url: mockPhotos[photoIndex].url,
      thumbnailUrl: mockPhotos[photoIndex].thumbnailUrl,
      publicId: mockPhotos[photoIndex].publicId,
      width: mockPhotos[photoIndex].width,
      height: mockPhotos[photoIndex].height,
      createdAt: mockPhotos[photoIndex].createdAt,
    };
    
    // Update the photo in our mock database
    mockPhotos[photoIndex] = updatedPhoto;
    
    return NextResponse.json(updatedPhoto);
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    );
  }
}

// DELETE /api/photos/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // In a real application, this would be a database query
    const photoIndex = mockPhotos.findIndex(p => p.id === id);
    
    if (photoIndex === -1) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    const photo = mockPhotos[photoIndex];
    
    // Delete from Cloudinary first
    if (photo.publicId) {
      await deleteImage(photo.publicId);
    }
    
    // Remove from our mock database
    mockPhotos.splice(photoIndex, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
} 