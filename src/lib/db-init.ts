import { prisma } from './prisma'

let isInitialized = false

export async function initializeDatabase() {
  if (isInitialized) return

  try {
    // Try to connect and create tables if they don't exist
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "jobs" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "companyName" TEXT NOT NULL,
      "companyWebsite" TEXT,
      "companyContact" TEXT NOT NULL,
      "companyDescription" TEXT NOT NULL,
      "jobTitle" TEXT NOT NULL,
      "department" TEXT NOT NULL,
      "locationType" TEXT NOT NULL,
      "location" TEXT,
      "jobType" TEXT NOT NULL,
      "salaryRange" TEXT,
      "jobDescription" TEXT NOT NULL
    )`

    // Add some seed data for demo
    const existingJobs = await prisma.job.count()
    
    if (existingJobs === 0) {
      await prisma.job.createMany({
        data: [
          {
            id: 'demo-1',
            companyName: 'DeFi Protocol Labs',
            companyWebsite: 'https://defiprotocol.com',
            companyContact: 'careers@defiprotocol.com',
            companyDescription: 'We are building the next generation of decentralized finance protocols to revolutionize how people interact with financial services.',
            jobTitle: 'Senior Frontend Developer',
            department: 'FRONTEND',
            locationType: 'REMOTE',
            location: 'Worldwide',
            jobType: 'FULL_TIME',
            salaryRange: '$120k - $180k',
            jobDescription: 'We are looking for a Senior Frontend Developer to join our growing team and help build the future of decentralized finance.',
            status: 'APPROVED'
          },
          {
            id: 'demo-2',
            companyName: 'Blockchain Ventures',
            companyWebsite: 'https://blockchainventures.io',
            companyContact: 'team@blockchainventures.io',
            companyDescription: 'A leading blockchain consultancy helping enterprises adopt Web3 technologies.',
            jobTitle: 'Smart Contract Developer',
            department: 'SMART_CONTRACT',
            locationType: 'HYBRID',
            location: 'New York, NY',
            jobType: 'FULL_TIME',
            salaryRange: '$140k - $200k',
            jobDescription: 'Join our team of blockchain experts and help enterprise clients build secure and efficient smart contracts.',
            status: 'APPROVED'
          }
        ]
      })
    }

    isInitialized = true
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization failed:', error)
    throw error
  }
}