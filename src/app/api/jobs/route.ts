import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JobSubmissionData } from '@/lib/types'
import { notifyNewJobSubmission } from '@/lib/telegram'

// GET /api/jobs - Get all approved jobs
export async function GET() {
  try {
    // Ensure database connection
    await prisma.$connect()
    
    const jobs = await prisma.job.findMany({
      where: {
        status: 'APPROVED'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`Found ${jobs.length} approved jobs`)
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    
    // Try to initialize database if tables don't exist
    try {
      console.log('Attempting to initialize database...')
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

// POST /api/jobs - Create a new job submission
export async function POST(request: NextRequest) {
  try {
    // Ensure database connection
    await prisma.$connect()
    
    const body: JobSubmissionData = await request.json()

    // Validate required fields
    const requiredFields = [
      'companyName',
      'companyContact',
      'companyDescription',
      'jobTitle',
      'department',
      'locationType',
      'jobType',
      'jobDescription'
    ]

    for (const field of requiredFields) {
      if (!body[field as keyof JobSubmissionData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    console.log('Creating job with data:', { 
      companyName: body.companyName, 
      jobTitle: body.jobTitle,
      status: 'PENDING'
    })

    // Create job with PENDING status
    const job = await prisma.job.create({
      data: {
        ...body,
        status: 'PENDING'
      }
    })

    console.log('Job created successfully:', { id: job.id, status: job.status })

    // Verify the job was saved by immediately fetching it
    const savedJob = await prisma.job.findUnique({
      where: { id: job.id }
    })
    
    if (!savedJob) {
      console.error('Job was not saved properly!')
      throw new Error('Job creation failed - not found after creation')
    }

    console.log('Job verified in database:', savedJob.id)

    // Send Telegram notification to admin channel
    try {
      await notifyNewJobSubmission(job)
      console.log('Telegram notification sent successfully')
    } catch (error) {
      console.error('Failed to send Telegram notification:', error)
      // Don't fail the job creation if notification fails
    }

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Failed to create job', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}