import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JobSubmissionData } from '@/lib/types'
import { notifyNewJobSubmission } from '@/lib/telegram'
import { initializeDatabase } from '@/lib/db-init'

// GET /api/jobs - Get all approved jobs
export async function GET() {
  try {
    // Initialize database on first request
    await initializeDatabase()
    
    const jobs = await prisma.job.findMany({
      where: {
        status: 'APPROVED'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Create a new job submission
export async function POST(request: NextRequest) {
  try {
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

    // Create job with PENDING status
    const job = await prisma.job.create({
      data: {
        ...body,
        status: 'PENDING'
      }
    })

    // Send Telegram notification to admin channel
    try {
      await notifyNewJobSubmission(job)
    } catch (error) {
      console.error('Failed to send Telegram notification:', error)
      // Don't fail the job creation if notification fails
    }

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}