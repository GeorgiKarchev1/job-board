'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { JobSubmissionForm } from '@/components/forms/job-submission-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Briefcase } from 'lucide-react'
import Link from 'next/link'

function SuccessMessage({ onSubmitAnother }: { onSubmitAnother: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
              Job Submitted Successfully!
            </h2>
            <p className="text-green-700 dark:text-green-300 max-w-md">
              Thank you for submitting your job listing. Our team will review it and publish it once approved. 
              You'll typically hear back within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={onSubmitAnother} variant="outline">
                Submit Another Job
              </Button>
              <Link href="/">
                <Button>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SubmitJobPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setShowSuccess(true)
    // Scroll to top
    window.scrollTo(0, 0)
  }

  const handleSubmitAnother = () => {
    setShowSuccess(false)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {showSuccess ? (
          <SuccessMessage onSubmitAnother={handleSubmitAnother} />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Submit a Job Listing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Post your job opportunity and connect with talented professionals. 
                All submissions are reviewed by our team before being published.
              </p>
            </div>

            {/* Info Card */}
            <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">
                  Before you submit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 dark:text-blue-300">
                <ul className="space-y-2 text-sm">
                  <li>• All job listings are reviewed and approved by our team</li>
                  <li>• Review typically takes 24-48 hours</li>
                  <li>• Make sure all information is accurate and complete</li>
                  <li>• Job descriptions support markdown formatting</li>
                  <li>• All fields marked with * are required</li>
                </ul>
              </CardContent>
            </Card>

            {/* Form */}
            <JobSubmissionForm onSuccess={handleSuccess} />
          </div>
        )}
      </main>
    </div>
  )
}