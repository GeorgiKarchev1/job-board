import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.job.deleteMany({})
  console.log('🧹 Cleared existing jobs')

  // Sample job data
  const sampleJobs = [
    {
      companyName: 'DeFi Protocol Labs',
      companyWebsite: 'https://defiprotocol.com',
      companyContact: 'careers@defiprotocol.com',
      companyDescription: 'We are building the next generation of decentralized finance protocols to revolutionize how people interact with financial services. Our team is passionate about creating secure, scalable, and user-friendly DeFi solutions.',
      jobTitle: 'Senior Frontend Developer',
      department: 'FRONTEND',
      locationType: 'REMOTE',
      location: 'Worldwide',
      jobType: 'FULL_TIME',
      salaryRange: '$120k - $180k',
      jobDescription: `# Senior Frontend Developer

We're looking for a Senior Frontend Developer to join our growing team and help build the future of decentralized finance.

## What you'll do:
- Build responsive, user-friendly interfaces for our DeFi protocols
- Work with React, TypeScript, and Web3 technologies
- Collaborate with designers and backend developers
- Optimize performance and user experience
- Write clean, maintainable code with comprehensive tests

## Requirements:
- 5+ years of frontend development experience
- Strong proficiency in React, TypeScript, and modern JavaScript
- Experience with Web3 technologies (ethers.js, wagmi, etc.)
- Knowledge of DeFi protocols and blockchain concepts
- Experience with state management (Redux, Zustand)
- Familiarity with testing frameworks (Jest, Cypress)

## Nice to have:
- Experience with Next.js and SSR
- Knowledge of Solidity and smart contracts
- Previous experience in DeFi or blockchain projects
- Understanding of security best practices in Web3`,
      status: 'APPROVED'
    },
    {
      companyName: 'Blockchain Ventures',
      companyWebsite: 'https://blockchainventures.io',
      companyContact: 'team@blockchainventures.io',
      companyDescription: 'A leading blockchain consultancy helping enterprises adopt Web3 technologies. We work with Fortune 500 companies to implement blockchain solutions and digital transformation strategies.',
      jobTitle: 'Smart Contract Developer',
      department: 'SMART_CONTRACT',
      locationType: 'HYBRID',
      location: 'New York, NY',
      jobType: 'FULL_TIME',
      salaryRange: '$140k - $200k',
      jobDescription: `# Smart Contract Developer

Join our team of blockchain experts and help enterprise clients build secure and efficient smart contracts.

## Responsibilities:
- Design and develop smart contracts using Solidity
- Conduct security audits and code reviews
- Integrate smart contracts with frontend applications
- Write comprehensive tests and documentation
- Stay up-to-date with latest DeFi protocols and security practices

## Requirements:
- 3+ years of Solidity development experience
- Deep understanding of Ethereum and EVM
- Experience with testing frameworks (Hardhat, Foundry)
- Knowledge of security best practices and common vulnerabilities
- Experience with DeFi protocols (Uniswap, Aave, Compound)

## Benefits:
- Competitive salary with equity options
- Flexible working arrangements
- Professional development budget
- Health and dental insurance`,
      status: 'APPROVED'
    },
    {
      companyName: 'CryptoStart',
      companyWebsite: 'https://cryptostart.com',
      companyContact: 'hr@cryptostart.com',
      companyDescription: 'An early-stage startup building innovative crypto trading tools and analytics platforms. We are a small, agile team focused on creating powerful tools for both retail and institutional traders.',
      jobTitle: 'Backend Engineer',
      department: 'BACKEND',
      locationType: 'REMOTE',
      jobType: 'FULL_TIME',
      salaryRange: '$100k - $140k',
      jobDescription: `# Backend Engineer

Help us build scalable backend systems for our crypto trading and analytics platform.

## What we're looking for:
- Strong experience with Node.js, Python, or Go
- Database design and optimization skills
- API design and development
- Experience with microservices architecture
- Knowledge of blockchain data and trading systems

## Bonus points:
- Experience with WebSocket real-time data
- Knowledge of trading algorithms
- Previous crypto/fintech experience
- DevOps and cloud infrastructure experience`,
      status: 'PENDING'
    },
    {
      companyName: 'Web3 Marketing Agency',
      companyWebsite: '',
      companyContact: '@web3marketing on Telegram',
      companyDescription: 'We help Web3 projects grow their communities and reach their target audiences through innovative marketing strategies and community management.',
      jobTitle: 'Business Development Manager',
      department: 'BD',
      locationType: 'REMOTE',
      jobType: 'PART_TIME',
      jobDescription: `# Business Development Manager

We're seeking a Business Development Manager to help us expand our client base and form strategic partnerships.

## Responsibilities:
- Identify and pursue new business opportunities
- Build relationships with Web3 projects and founders
- Develop strategic partnerships
- Create and present proposals
- Manage client relationships

## Requirements:
- 3+ years of business development experience
- Strong network in the Web3/crypto space
- Excellent communication and presentation skills
- Understanding of Web3 technologies and trends
- Self-motivated and results-driven`,
      status: 'APPROVED'
    },
    {
      companyName: 'NFT Marketplace Inc',
      companyWebsite: 'https://nftmarketplace.com',
      companyContact: 'jobs@nftmarketplace.com',
      companyDescription: 'The leading NFT marketplace for digital art and collectibles. We provide creators and collectors with a seamless platform to mint, buy, and sell NFTs.',
      jobTitle: 'Full Stack Developer',
      department: 'FRONTEND',
      locationType: 'ONSITE',
      location: 'San Francisco, CA',
      jobType: 'CONTRACT',
      salaryRange: '$80 - $120/hour',
      jobDescription: `# Full Stack Developer (Contract)

6-month contract position to help build new features for our NFT marketplace.

## Tech Stack:
- Frontend: React, TypeScript, Next.js
- Backend: Node.js, Express, MongoDB
- Blockchain: Ethereum, Polygon, IPFS
- Tools: Git, Docker, AWS

## Requirements:
- 4+ years of full-stack development
- Experience with NFT/blockchain technologies
- Strong JavaScript/TypeScript skills
- Database design experience
- Available for 3-6 month commitment`,
      status: 'REJECTED'
    }
  ]

  // Create jobs
  for (const jobData of sampleJobs) {
    await prisma.job.create({
      data: jobData as any
    })
  }

  console.log(`✅ Created ${sampleJobs.length} sample jobs`)
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })