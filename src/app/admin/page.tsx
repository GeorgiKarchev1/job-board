'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { JobManagementTable } from '@/components/admin/job-management-table'
import { TelegramSettings } from '@/components/admin/telegram-settings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Job, JobStatus } from '@/lib/types'
import { ClipboardList, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<JobStatus | 'ALL'>('ALL')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/admin/jobs')
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (jobId: string, status: JobStatus) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update job status')
      }

      // Update local state
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, status } : job
        )
      )
    } catch (error) {
      console.error('Error updating job status:', error)
      alert('Failed to update job status. Please try again.')
    }
  }

  const handleDelete = async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete job')
      }

      // Remove from local state
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId))
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job. Please try again.')
    }
  }

  const filteredJobs = filter === 'ALL' ? jobs : jobs.filter(job => job.status === filter)

  const getStats = () => {
    const total = jobs.length
    const pending = jobs.filter(job => job.status === 'PENDING').length
    const approved = jobs.filter(job => job.status === 'APPROVED').length
    const rejected = jobs.filter(job => job.status === 'REJECTED').length

    return { total, pending, approved, rejected }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading admin panel...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage job submissions and listings
            </p>
          </div>
          <Button onClick={fetchJobs} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-sm font-medium">Filter by status:</span>
          <Button
            variant={filter === 'ALL' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('ALL')}
          >
            All ({stats.total})
          </Button>
          <Button
            variant={filter === 'PENDING' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('PENDING')}
          >
            Pending ({stats.pending})
          </Button>
          <Button
            variant={filter === 'APPROVED' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('APPROVED')}
          >
            Approved ({stats.approved})
          </Button>
          <Button
            variant={filter === 'REJECTED' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('REJECTED')}
          >
            Rejected ({stats.rejected})
          </Button>
        </div>

        {/* Telegram Settings */}
        <div className="mb-8">
          <TelegramSettings />
        </div>

        {/* Jobs Table */}
        <JobManagementTable
          jobs={filteredJobs}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
        </main>
      </div>
    </ProtectedRoute>
  )
}