import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/jobs/[id] - Delete a job
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`🗑️ Deleting job with ID: ${params.id}`)
    
    // Ensure database connection
    await prisma.$connect()
    
    // Check if job exists first
    const existingJob = await prisma.job.findUnique({
      where: { id: params.id }
    })

    if (!existingJob) {
      console.error(`❌ Job not found for deletion: ${params.id}`)
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    console.log(`📊 Deleting job: ${existingJob.jobTitle} at ${existingJob.companyName}`)

    await prisma.job.delete({
      where: {
        id: params.id
      }
    })

    console.log(`✅ Job deleted successfully: ${params.id}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Error deleting job:', error)
    
    // Handle case where job doesn't exist
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete job', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}