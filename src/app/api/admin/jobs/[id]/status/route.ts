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
    console.log(`🔄 Updating job status for job ID: ${params.id}`)
    
    const { status }: { status: JobStatus } = await request.json()
    console.log(`📝 New status: ${status}`)

    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      console.error('❌ Invalid status provided:', status)
      return NextResponse.json(
        { error: 'Invalid status. Must be PENDING, APPROVED, or REJECTED' },
        { status: 400 }
      )
    }

    // Ensure database connection
    await prisma.$connect()

    // Check if job exists first
    const existingJob = await prisma.job.findUnique({
      where: { id: params.id }
    })

    if (!existingJob) {
      console.error(`❌ Job not found: ${params.id}`)
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    console.log(`📊 Current job status: ${existingJob.status} → ${status}`)

    const job = await prisma.job.update({
      where: {
        id: params.id
      },
      data: {
        status,
        updatedAt: new Date()
      }
    })

    console.log(`✅ Job status updated successfully:`, {
      id: job.id,
      title: job.jobTitle,
      oldStatus: existingJob.status,
      newStatus: job.status,
      updatedAt: job.updatedAt
    })

    // Send Telegram notification if job was approved
    if (status === 'APPROVED') {
      try {
        console.log('📢 Sending Telegram approval notification...')
        await notifyJobApproved(job)
        console.log('✅ Telegram notification sent successfully')
      } catch (error) {
        console.error('❌ Failed to send Telegram notification:', error)
        // Don't fail the status update if notification fails
      }
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('❌ Error updating job status:', error)
    
    // Handle case where job doesn't exist
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update job status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}