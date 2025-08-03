import Link from 'next/link'
import { Building2, MapPin, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Job, DEPARTMENT_LABELS, LOCATION_TYPE_LABELS, JOB_TYPE_LABELS } from '@/lib/types'
import { formatRelativeTime, truncateText } from '@/lib/utils'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {job.jobTitle}
            </CardTitle>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{job.companyName}</span>
            </div>
          </div>
          <Badge variant="secondary">
            {DEPARTMENT_LABELS[job.department]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>
              {LOCATION_TYPE_LABELS[job.locationType]}
              {job.location && ` - ${job.location}`}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{JOB_TYPE_LABELS[job.jobType]}</span>
          </div>
          {job.salaryRange && (
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>{job.salaryRange}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {truncateText(job.companyDescription, 150)}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            Posted {formatRelativeTime(job.createdAt)}
          </span>
          <Link href={`/jobs/${job.id}`}>
            <Button size="sm" className="group-hover:shadow-md transition-all">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}