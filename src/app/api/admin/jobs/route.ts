import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/jobs - Get all jobs for admin
export async function GET() {
  try {
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

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching admin jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}