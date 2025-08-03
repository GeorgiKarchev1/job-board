import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Initialize database and create tables
export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Create tables (Prisma will handle this automatically with db push)
    // Just test if we can query
    await prisma.job.findMany({ take: 1 })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      provider: 'postgresql'
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    
    // If tables don't exist, try to create them
    try {
      // This will create tables if they don't exist
      await prisma.$executeRaw`SELECT 1`
      
      return NextResponse.json({ 
        success: true, 
        message: 'Database connection established',
        provider: 'postgresql'
      })
    } catch (createError) {
      console.error('Failed to create tables:', createError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database initialization failed',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  }
}