import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { uploadImage } from '@/utils/cloudinary';
import { Photo } from '@/data/models/Photo';
import os from 'os';
import formidable from 'formidable';
import { addPhotoToStore } from '../route';

// For App Router, we need to use this export syntax for disabling body parser
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Need nodejs runtime for fs
export async function POST(req: NextRequest) {
  try {
    console.log('Photo upload request received');
    
    // Create temp directory
    const tempDir = path.join(os.tmpdir(), 'tiletech-uploads');
    await fs.mkdir(tempDir, { recursive: true });
    console.log('Temporary directory created:', tempDir);
    
    // Get the FormData from the request
    const formData = await req.formData();
    
    // Log FormData entries safely
    const formDataKeys: string[] = [];
    formData.forEach((_, key) => {
      formDataKeys.push(key);
    });
    console.log('FormData received, keys:', formDataKeys);
    
    // Get the file from the form data
    const file = formData.get('file') as File;
    if (!file) {
      console.error('No file found in the request');
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    // Extract metadata from form data
    const title = formData.get('title') as string || 'Untitled';
    const description = formData.get('description') as string || '';
    const category = formData.get('category') as string || 'general';
    const tags = formData.get('tags') as string || '';
    
    console.log('Metadata received:', { title, description, category, tags });
    
    // Convert File to ArrayBuffer and save to disk temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a temporary filepath
    const tempFilePath = path.join(tempDir, file.name);
    await fs.writeFile(tempFilePath, buffer);
    console.log('File saved temporarily at:', tempFilePath);
    
    // Upload the temporary file to Cloudinary
    console.log('Starting upload to Cloudinary...');
    const uploadResult = await uploadImage(tempFilePath);
    console.log('Cloudinary upload successful:', {
      url: uploadResult.url,
      thumbnailUrl: uploadResult.thumbnailUrl
    });
    
    // Create a new photo record
    const newPhoto: Photo = {
      id: uuidv4(),
      title: title,
      description: description,
      url: uploadResult.url,
      thumbnailUrl: uploadResult.thumbnailUrl,
      publicId: uploadResult.publicId,
      width: uploadResult.width,
      height: uploadResult.height,
      createdAt: new Date().toISOString(),
      category: category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    };
    
    // Store the photo in our in-memory database
    addPhotoToStore(newPhoto);
    
    // Clean up the temp file
    await fs.unlink(tempFilePath).catch(err => {
      console.error('Error deleting temp file:', err);
    });
    console.log('Temporary file cleaned up');
    
    // Return the photo data
    console.log('Returning successful response');
    return NextResponse.json({ photo: newPhoto }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload photo' },
      { status: 500 }
    );
  }
} 