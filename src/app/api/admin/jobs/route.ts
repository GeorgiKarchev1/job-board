import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/jobs - Get all jobs for admin
export async function GET() {
  try {
    // Ensure database connection
    await prisma.$connect()
    
    const jobs = await prisma.job.findMany({
      orderBy: [
        {
          status: 'asc' // PENDING first, then APPROVED, then REJECTED
        },
        {
          createdAt: 'desc'
        }
      ]
    })

    console.log(`Found ${jobs.length} total jobs for admin`)
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching admin jobs:', error)
    
    // Try to initialize database if tables don't exist
    try {
      console.log('Attempting to initialize database for admin...')
      await prisma.$executeRaw`SELECT 1`
      return NextResponse.json([]) // Return empty array if no jobs yet
    } catch (initError) {
      console.error('Database initialization failed:', initError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
  }
}