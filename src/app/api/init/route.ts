import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Initialize database and create tables
export async function GET() {
  try {
    console.log('🚀 Starting database initialization...')
    
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connection established')
    
    // Check if Job table exists and get count
    const jobCount = await prisma.job.count()
    console.log(`📊 Found ${jobCount} jobs in database`)
    
    // Get recent jobs for debugging
    const recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        jobTitle: true,
        companyName: true,
        status: true,
        createdAt: true
      }
    })
    
    console.log('📝 Recent jobs:', recentJobs)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      provider: 'postgresql',
      jobCount,
      recentJobs,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Database initialization error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// POST endpoint to manually initialize database schema
export async function POST() {
  try {
    console.log('🔧 Manual database schema initialization...')
    
    // Force push database schema
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Job" (
        "id" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "companyName" TEXT NOT NULL,
        "companyWebsite" TEXT,
        "companyContact" TEXT NOT NULL,
        "companyDescription" TEXT NOT NULL,
        "jobTitle" TEXT NOT NULL,
        "department" TEXT NOT NULL,
        "locationType" TEXT NOT NULL,
        "location" TEXT,
        "jobType" TEXT NOT NULL,
        "salaryRange" TEXT,
        "jobDescription" TEXT NOT NULL,
        CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
      );
    `
    
    console.log('✅ Database schema created/verified')
    
    return NextResponse.json({
      success: true,
      message: 'Database schema initialized manually',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Manual schema initialization failed:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Manual schema initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}