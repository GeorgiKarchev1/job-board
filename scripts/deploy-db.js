const { execSync } = require('child_process')

async function deployDatabase() {
  try {
    console.log('🚀 Setting up database for production...')
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable not set')
      process.exit(1)
    }
    
    console.log('📋 DATABASE_URL configured:', process.env.DATABASE_URL.substring(0, 20) + '...')
    
    // Push database schema
    console.log('📊 Pushing database schema...')
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
    
    console.log('🎉 Database setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    
    // For Vercel, don't fail the build if DB setup fails
    if (process.env.VERCEL) {
      console.log('⚠️  Continuing build despite DB setup failure (will initialize at runtime)')
      process.exit(0)
    } else {
      process.exit(1)
    }
  }
}

deployDatabase()