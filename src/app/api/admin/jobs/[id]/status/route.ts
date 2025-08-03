import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JobStatus } from '@/lib/types'
import { notifyJobApproved } from '@/lib/telegram'

// PATCH /api/admin/jobs/[id]/status - Update job status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status }: { status: JobStatus } = await request.json()

    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be PENDING, APPROVED, or REJECTED' },
        { status: 400 }
      )
    }

    const job = await prisma.job.update({
      where: {
        id: params.id
      },
      data: {
        status,
        updatedAt: new Date()
      }
    })

    // Send Telegram notification if job was approved
    if (status === 'APPROVED') {
      try {
        await notifyJobApproved(job)
      } catch (error) {
        console.error('Failed to send Telegram notification:', error)
        // Don't fail the status update if notification fails
      }
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error updating job status:', error)
    
    // Handle case where job doesn't exist
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update job status' },
      { status: 500 }
    )
  }
}