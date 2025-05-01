import { NextRequest, NextResponse } from 'next/server';

/**
 * Health check API endpoint to monitor application status
 * Used by monitoring services and deployment pipelines
 * 
 * @returns Status 200 with application health information
 */
export async function GET(request: NextRequest) {
  // Get application version from package.json
  const version = process.env.npm_package_version || '0.1.0';
  
  // Basic application health metrics
  const healthData = {
    status: 'healthy',
    version,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  };
  
  return NextResponse.json(healthData, { status: 200 });
} 