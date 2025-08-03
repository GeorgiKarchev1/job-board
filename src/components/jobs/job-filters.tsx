'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Department, 
  LocationType, 
  JobType, 
  JobFilters,
  DEPARTMENT_LABELS,
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS
} from '@/lib/types'

interface JobFiltersProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
}

export function JobFiltersComponent({ filters, onFiltersChange }: JobFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    })
  }

  const clearFilter = (key: keyof JobFilters) => {
    onFiltersChange({
      ...filters,
      [key]: undefined,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.department && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>{DEPARTMENT_LABELS[filters.department]}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => clearFilter('department')}
              />
            </Badge>
          )}
          {filters.locationType && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>{LOCATION_TYPE_LABELS[filters.locationType]}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => clearFilter('locationType')}
              />
            </Badge>
          )}
          {filters.jobType && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>{JOB_TYPE_LABELS[filters.jobType]}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => clearFilter('jobType')}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <Card className="mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg">Filter Jobs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select
                value={filters.department || ''}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {Object.entries(DEPARTMENT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location Type</label>
              <Select
                value={filters.locationType || ''}
                onChange={(e) => handleFilterChange('locationType', e.target.value)}
              >
                <option value="">All Locations</option>
                {Object.entries(LOCATION_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Select
                value={filters.jobType || ''}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              >
                <option value="">All Types</option>
                {Object.entries(JOB_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}