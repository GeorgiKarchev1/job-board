# Job Board MVP

A modern, fully-functional job board platform built with Next.js, where companies can submit job listings for admin approval before being displayed publicly.

## 🚀 Features

### Public Features
- **Job Listings**: Browse approved job opportunities with advanced filtering
- **Job Details**: Full job descriptions with company information and application details
- **Job Submission**: Easy-to-use form for companies to submit job listings
- **Search & Filters**: Filter by department, location type, and job type

### Admin Features
- **Admin Dashboard**: Comprehensive panel for managing job submissions
- **Job Approval**: Approve, reject, or edit job submissions
- **Analytics**: View statistics and manage all job listings
- **Status Management**: Change job status and delete listings
- **Telegram Integration**: Automatic notifications for job approvals and submissions

### Technical Features
- **Responsive Design**: Works perfectly on desktop and mobile
- **Custom UI**: Polished, professional design that doesn't look AI-generated
- **Database Integration**: SQLite with Prisma ORM (easily switchable to PostgreSQL/Supabase)
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Client and server-side validation with Zod
- **API Routes**: RESTful API for all functionality
- **Admin Authentication**: Simple login system for admin panel access
- **Telegram Bot**: Optional integration for automatic notifications

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: SQLite with Prisma ORM
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel deployment

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd job-board
   npm install
   ```

2. **Initialize database**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Seed with sample data**:
   ```bash
   npm run db:seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## 📱 Usage Guide

### For Job Seekers
1. Visit the homepage to browse approved job listings
2. Use filters to narrow down opportunities
3. Click "View Details" to see full job descriptions
4. Contact companies directly using provided contact information

### For Companies
1. Navigate to "Submit Job" in the header
2. Fill out the comprehensive job submission form
3. Submit for admin review (typically 24-48 hours)
4. Receive approval and see your job go live

### For Admins
1. Access the admin panel at `/admin` (login: admin/admin123)
2. Review pending job submissions
3. Approve or reject submissions with one click
4. Manage all job listings and view analytics
5. Optional: Configure Telegram notifications (see TELEGRAM_SETUP.md)

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── jobs/              # Job detail pages
│   ├── submit/            # Job submission
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   ├── jobs/              # Job-related components
│   ├── admin/             # Admin components
│   └── layout/            # Layout components
├── lib/                   # Utilities and configuration
│   ├── prisma.ts          # Database client
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
└── prisma/               # Database schema and migrations
```

## 🎨 Design Philosophy

The UI is designed to feel modern and professional, inspired by clean Web3 interfaces like HyperBeat and Ventuals. Key design principles:

- **Custom Components**: No default Tailwind templates
- **Subtle Animations**: Smooth transitions and hover effects
- **Clean Typography**: Inter font with proper spacing
- **Card-based Layout**: Clean, organized information display
- **Consistent Color Palette**: Professional blues and neutrals
- **Responsive Design**: Mobile-first approach

## 🔧 API Endpoints

### Public API
- `GET /api/jobs` - Get all approved jobs
- `POST /api/jobs` - Submit a new job (pending status)
- `GET /api/jobs/[id]` - Get specific approved job

### Admin API
- `GET /api/admin/jobs` - Get all jobs (all statuses)
- `PATCH /api/admin/jobs/[id]/status` - Update job status
- `DELETE /api/admin/jobs/[id]` - Delete a job

## 🗄️ Database Schema

```prisma
model Job {
  id                 String      @id @default(cuid())
  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt
  status             JobStatus   @default(PENDING)
  
  // Company Info
  companyName        String
  companyWebsite     String?
  companyContact     String
  companyDescription String
  
  // Job Info
  jobTitle           String
  department         Department
  locationType       LocationType
  location           String?
  jobType            JobType
  salaryRange        String?
  jobDescription     String
}
```

## 🔄 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Push schema changes
npm run db:seed         # Populate with sample data
npm run db:studio       # Open Prisma Studio
npm run db:generate     # Generate Prisma client

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables (if using external DB)
4. Deploy automatically

### Environment Variables (Optional)
```env
# For external database (e.g., Supabase)
DATABASE_URL="postgresql://..."

# For production builds
NODE_ENV="production"
```

## 🔄 Switching to PostgreSQL/Supabase

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Add environment variable:
   ```env
   DATABASE_URL="your-postgres-connection-string"
   ```

3. Run migrations:
   ```bash
   npx prisma db push
   ```

## 📋 Next Steps & Enhancements

### Short Term
- [ ] Email notifications for job approvals
- [ ] Telegram bot integration for admin notifications
- [ ] Company dashboard for managing submissions
- [ ] Advanced search with full-text search

### Medium Term
- [ ] User authentication system
- [ ] Company profiles and branding
- [ ] Application tracking system
- [ ] Analytics and reporting

### Long Term
- [ ] Payment integration for featured listings
- [ ] Advanced matching algorithms
- [ ] Multi-language support
- [ ] Mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 💬 Support

For questions or support, please reach out via:
- GitHub Issues for bug reports
- Email for general inquiries
- Discord for community discussions

---

Built with ❤️ using Next.js and modern web technologies.