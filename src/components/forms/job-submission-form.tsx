'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { 
  Department, 
  LocationType, 
  JobType,
  DEPARTMENT_LABELS,
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS
} from '@/lib/types'

const jobSubmissionSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyWebsite: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  companyContact: z.string().min(3, 'Contact information is required'),
  companyDescription: z.string().min(10, 'Company description must be at least 10 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  department: z.enum(['BD', 'BACKEND', 'FRONTEND', 'SMART_CONTRACT'], { required_error: 'Please select a department' }),
  locationType: z.enum(['REMOTE', 'ONSITE', 'HYBRID'], { required_error: 'Please select a location type' }),
  location: z.string().optional(),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT'], { required_error: 'Please select a job type' }),
  salaryRange: z.string().optional(),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters'),
})

type JobSubmissionFormData = z.infer<typeof jobSubmissionSchema>

interface JobSubmissionFormProps {
  onSuccess: () => void
}

export function JobSubmissionForm({ onSuccess }: JobSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobSubmissionFormData>({
    resolver: zodResolver(jobSubmissionSchema),
  })

  const onSubmit = async (data: JobSubmissionFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit job')
      }

      reset()
      onSuccess()
    } catch (err) {
      setError('Failed to submit job. Please try again.')
      console.error('Error submitting job:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Company Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="Acme Corp"
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                type="url"
                {...register('companyWebsite')}
                placeholder="https://acme.com"
              />
              {errors.companyWebsite && (
                <p className="text-sm text-destructive">{errors.companyWebsite.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyContact">Contact Information *</Label>
            <Input
              id="companyContact"
              {...register('companyContact')}
              placeholder="Email, Telegram, Discord, etc."
            />
            {errors.companyContact && (
              <p className="text-sm text-destructive">{errors.companyContact.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description *</Label>
            <Textarea
              id="companyDescription"
              {...register('companyDescription')}
              placeholder="Tell us about your company..."
              rows={4}
            />
            {errors.companyDescription && (
              <p className="text-sm text-destructive">{errors.companyDescription.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job Information */}
      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                {...register('jobTitle')}
                placeholder="Senior Frontend Developer"
              />
              {errors.jobTitle && (
                <p className="text-sm text-destructive">{errors.jobTitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select id="department" {...register('department')}>
                <option value="">Select a department</option>
                {Object.entries(DEPARTMENT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
              {errors.department && (
                <p className="text-sm text-destructive">{errors.department.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="locationType">Location Type *</Label>
              <Select id="locationType" {...register('locationType')}>
                <option value="">Select location type</option>
                {Object.entries(LOCATION_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
              {errors.locationType && (
                <p className="text-sm text-destructive">{errors.locationType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Specific Location (Optional)</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type *</Label>
              <Select id="jobType" {...register('jobType')}>
                <option value="">Select job type</option>
                {Object.entries(JOB_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
              {errors.jobType && (
                <p className="text-sm text-destructive">{errors.jobType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
              <Input
                id="salaryRange"
                {...register('salaryRange')}
                placeholder="$100k - $150k"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              {...register('jobDescription')}
              placeholder="Describe the role, responsibilities, requirements, etc. You can use markdown formatting."
              rows={8}
            />
            <p className="text-xs text-muted-foreground">
              You can use markdown formatting for better readability.
            </p>
            {errors.jobDescription && (
              <p className="text-sm text-destructive">{errors.jobDescription.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="flex items-center space-x-2 text-destructive pt-6">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Job Listing'
          )}
        </Button>
      </div>
    </form>
  )
}