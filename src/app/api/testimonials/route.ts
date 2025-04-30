import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the testimonials data file
    const filePath = path.join(process.cwd(), 'src', 'data', 'testimonials.json');
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const testimonials = JSON.parse(fileContents);
    
    // Return the testimonials data
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Error reading testimonials data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials data' },
      { status: 500 }
    );
  }
} 