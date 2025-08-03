'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { JobCard } from '@/components/jobs/job-card'
import { JobFiltersComponent } from '@/components/jobs/job-filters'
import { Job, JobFilters } from '@/lib/types'
import { Search, Briefcase } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [filters, setFilters] = useState<JobFilters>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, filters, searchQuery])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = jobs.filter(job => job.status === 'APPROVED')

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job =>
        job.jobTitle.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query) ||
        job.companyDescription.toLowerCase().includes(query) ||
        job.jobDescription.toLowerCase().includes(query)
      )
    }

    // Apply filters
    if (filters.department) {
      filtered = filtered.filter(job => job.department === filters.department)
    }
    if (filters.locationType) {
      filtered = filtered.filter(job => job.locationType === filters.locationType)
    }
    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType)
    }

    setFilteredJobs(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Find Your Next{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover amazing job opportunities from top companies in the blockchain and tech space.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search jobs, companies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <JobFiltersComponent 
          filters={filters} 
          onFiltersChange={setFilters} 
        />

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Job Opportunities
            </h2>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Briefcase className="h-5 w-5" />
              <span>{filteredJobs.length} jobs found</span>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters.
            </p>
            <Button onClick={() => {
              setSearchQuery('')
              setFilters({})
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}