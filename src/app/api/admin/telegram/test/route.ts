import { NextResponse } from 'next/server'
import { testTelegramConnection } from '@/lib/telegram'

// GET /api/admin/telegram/test - Test Telegram bot connection
export async function GET() {
  try {
    const result = await testTelegramConnection()
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Telegram bot connection successful!' 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Error testing Telegram connection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to test connection' },
      { status: 500 }
    )
  }
}