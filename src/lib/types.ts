// Define string literal types for type safety
export type JobStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type Department = 'BD' | 'BACKEND' | 'FRONTEND' | 'SMART_CONTRACT'
export type LocationType = 'REMOTE' | 'ONSITE' | 'HYBRID'
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT'

// Job type definition
export type Job = {
  id: string
  createdAt: string | Date
  updatedAt: string | Date
  status: JobStatus
  companyName: string
  companyWebsite: string | null
  companyContact: string
  companyDescription: string
  jobTitle: string
  department: Department
  locationType: LocationType
  location: string | null
  jobType: JobType
  salaryRange: string | null
  jobDescription: string
}

export interface JobSubmissionData {
  companyName: string
  companyWebsite?: string
  companyContact: string
  companyDescription: string
  jobTitle: string
  department: Department
  locationType: LocationType
  location?: string
  jobType: JobType
  salaryRange?: string
  jobDescription: string
}

export interface JobFilters {
  department?: Department
  locationType?: LocationType
  jobType?: JobType
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  BD: 'Business Development',
  BACKEND: 'Backend Development',
  FRONTEND: 'Frontend Development',
  SMART_CONTRACT: 'Smart Contract Development',
}

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  REMOTE: 'Remote',
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
}