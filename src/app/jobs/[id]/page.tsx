'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Building2, MapPin, Clock, DollarSign, Globe, Mail } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Job, DEPARTMENT_LABELS, LOCATION_TYPE_LABELS, JOB_TYPE_LABELS } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import Markdown from 'markdown-to-jsx'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchJob(params.id as string)
    }
  }, [params.id])

  const fetchJob = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs/${id}`)
      if (!response.ok) {
        throw new Error('Job not found')
      }
      const data = await response.json()
      setJob(data)
    } catch (error) {
      console.error('Error fetching job:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading job details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
            <Link href="/">
              <Button>Back to jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to jobs</span>
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl">{job.jobTitle}</CardTitle>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Building2 className="h-5 w-5" />
                      <span className="text-lg font-medium">{job.companyName}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {DEPARTMENT_LABELS[job.department]}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-muted-foreground pt-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {LOCATION_TYPE_LABELS[job.locationType]}
                      {job.location && ` - ${job.location}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{JOB_TYPE_LABELS[job.jobType]}</span>
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salaryRange}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {job.companyDescription}
                </p>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <Markdown>{job.jobDescription}</Markdown>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-center">Apply for this position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Interested in this role? Get in touch with the company directly.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Contact:</span>
                    <span className="text-muted-foreground">{job.companyContact}</span>
                  </div>
                  
                  {job.companyWebsite && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Website:</span>
                      <a 
                        href={job.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Company
                      </a>
                    </div>
                  )}
                </div>

                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Job Info */}
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted:</span>
                  <span className="font-medium">{formatDate(job.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{DEPARTMENT_LABELS[job.department]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{LOCATION_TYPE_LABELS[job.locationType]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{JOB_TYPE_LABELS[job.jobType]}</span>
                </div>
                {job.salaryRange && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-medium">{job.salaryRange}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}