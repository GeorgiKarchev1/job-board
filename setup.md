# Quick Setup Guide

Follow these steps to get your Job Board MVP running:

## 1. Install Dependencies
```bash
npm install
```

## 2. Initialize Database
```bash
npx prisma db push
npx prisma generate
```

## 3. Seed with Sample Data
```bash
npm run db:seed
```

## 4. Start Development Server
```bash
npm run dev
```

## 5. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

## Test the Application

### Browse Jobs (Public)
- Homepage shows approved job listings
- Use filters to narrow down results
- Click on job cards to view details
- Test the search functionality

### Submit a Job (Public)
- Navigate to "Submit Job" in header
- Fill out the comprehensive form
- Submit and see success message
- Job will appear in admin panel as "Pending"

### Admin Panel
- Visit `/admin` route
- See dashboard with statistics
- Review pending jobs and approve/reject them
- Manage all job listings

## Sample Data Included
- 5 sample job listings with different statuses
- Companies from DeFi, NFT, and Web3 space
- Various departments and job types
- Mix of approved, pending, and rejected jobs

## Database Studio (Optional)
```bash
npm run db:studio
```
This opens a visual interface to explore your database.

## Ready to customize!
The codebase is fully modular and ready for customization. All components are in `src/components/` and pages in `src/app/`.