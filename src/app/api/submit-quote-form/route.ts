import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { fullFormSchema } from '@/utils/validationSchemas';

// Rate limiting 
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory rate limit store
// Note: For production, use Redis or similar for distributed environments
const rateLimitStore: RateLimitStore = {};

// Rate limit settings
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

// Check rate limit by IP
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  
  // Initialize or reset expired entries
  if (!rateLimitStore[ip] || rateLimitStore[ip].resetTime < now) {
    rateLimitStore[ip] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
  }
  
  // Increment count
  rateLimitStore[ip].count++;
  
  // Check if over limit
  return rateLimitStore[ip].count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'הוגשו יותר מדי בקשות. אנא נסה שוב מאוחר יותר.' },
        { status: 429 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate with Zod schema
    const result = fullFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'נתונים לא תקינים', errors: result.error.format() },
        { status: 400 }
      );
    }
    
    // Add submission timestamp and metadata
    const submission = {
      ...result.data,
      id: Date.now().toString(),
      ipAddress: ip,
      submittedAt: new Date().toISOString(),
      status: 'new', // new, contacted, quoted, rejected, completed
      userAgent: request.headers.get('user-agent') || 'unknown',
    };
    
    // Save submission to file
    // For production, consider using a database instead
    const dataDir = path.join(process.cwd(), 'data', 'submissions');
    
    // Create directory if it doesn't exist
    fs.mkdirSync(dataDir, { recursive: true });
    
    // Write submission to file
    const filePath = path.join(dataDir, `submission-${submission.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(submission, null, 2), 'utf8');
    
    // Add to submissions log
    const logPath = path.join(dataDir, 'submissions-log.json');
    let submissionsLog = [];
    
    if (fs.existsSync(logPath)) {
      try {
        submissionsLog = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      } catch (e) {
        // If log is corrupt, start a new one
        console.error('Error reading submissions log:', e);
      }
    }
    
    // Add to log with limited data (no details, just summary)
    submissionsLog.push({
      id: submission.id,
      name: `${submission.firstName} ${submission.lastName}`,
      email: submission.email,
      phone: submission.phone,
      projectType: submission.projectType,
      submittedAt: submission.submittedAt,
      status: submission.status,
    });
    
    // Save updated log
    fs.writeFileSync(logPath, JSON.stringify(submissionsLog, null, 2), 'utf8');
    
    // TODO: Send email notification
    // This would use a service like Nodemailer with SMTP or SendGrid
    // For now, we'll skip this as it requires environment configuration
    
    // Return success response
    return NextResponse.json(
      { message: 'הבקשה נשלחה בהצלחה', id: submission.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote form submission:', error);
    
    return NextResponse.json(
      { message: 'אירעה שגיאה בעיבוד הבקשה' },
      { status: 500 }
    );
  }
} 