'use client'

import { useState } from 'react'
import { Check, X, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Job, JobStatus, DEPARTMENT_LABELS, LOCATION_TYPE_LABELS, JOB_TYPE_LABELS } from '@/lib/types'
import { formatRelativeTime, truncateText } from '@/lib/utils'

interface JobManagementTableProps {
  jobs: Job[]
  onStatusChange: (jobId: string, status: JobStatus) => Promise<void>
  onDelete: (jobId: string) => Promise<void>
}

export function JobManagementTable({ jobs, onStatusChange, onDelete }: JobManagementTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const handleStatusChange = async (jobId: string, status: JobStatus) => {
    setLoadingStates(prev => ({ ...prev, [jobId]: true }))
    try {
      await onStatusChange(jobId, status)
    } finally {
      setLoadingStates(prev => ({ ...prev, [jobId]: false }))
    }
  }

  const handleDelete = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      setLoadingStates(prev => ({ ...prev, [jobId]: true }))
      try {
        await onDelete(jobId)
      } finally {
        setLoadingStates(prev => ({ ...prev, [jobId]: false }))
      }
    }
  }

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary">Pending</Badge>
      case 'APPROVED':
        return <Badge variant="default">Approved</Badge>
      case 'REJECTED':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No jobs found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">{job.jobTitle}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="font-medium">{job.companyName}</span>
                  <span>{DEPARTMENT_LABELS[job.department]}</span>
                  <span>{LOCATION_TYPE_LABELS[job.locationType]}</span>
                  <span>{JOB_TYPE_LABELS[job.jobType]}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(job.status)}
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(job.createdAt)}
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {/* Company Info */}
              <div className="grid gap-2 text-sm">
                <div><span className="font-medium">Contact:</span> {job.companyContact}</div>
                {job.companyWebsite && (
                  <div>
                    <span className="font-medium">Website:</span>{' '}
                    <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {job.companyWebsite}
                    </a>
                  </div>
                )}
                {job.salaryRange && (
                  <div><span className="font-medium">Salary:</span> {job.salaryRange}</div>
                )}
              </div>

              {/* Description Preview */}
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Company Description:</p>
                <p>{truncateText(job.companyDescription, 150)}</p>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Job Description:</p>
                <p>{truncateText(job.jobDescription, 200)}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  {job.status === 'PENDING' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(job.id, 'APPROVED')}
                        disabled={loadingStates[job.id]}
                        className="flex items-center space-x-1"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(job.id, 'REJECTED')}
                        disabled={loadingStates[job.id]}
                        className="flex items-center space-x-1"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </Button>
                    </>
                  )}
                  
                  {job.status === 'APPROVED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(job.id, 'PENDING')}
                      disabled={loadingStates[job.id]}
                    >
                      Move to Pending
                    </Button>
                  )}
                  
                  {job.status === 'REJECTED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(job.id, 'PENDING')}
                      disabled={loadingStates[job.id]}
                    >
                      Move to Pending
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(job.id)}
                    disabled={loadingStates[job.id]}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}