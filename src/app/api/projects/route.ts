import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the projects data file
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const projects = JSON.parse(fileContents);
    
    // Return the projects data
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error reading projects data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data' },
      { status: 500 }
    );
  }
} 