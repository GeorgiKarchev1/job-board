// Telegram Bot integration for job notifications

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: 'Markdown' | 'HTML'
  disable_web_page_preview?: boolean
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_PUBLIC_CHANNEL_ID = process.env.TELEGRAM_PUBLIC_CHANNEL_ID // For approved jobs
const TELEGRAM_ADMIN_CHANNEL_ID = process.env.TELEGRAM_ADMIN_CHANNEL_ID   // For new submissions

async function sendTelegramMessage(message: TelegramMessage): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn('Telegram bot token not configured')
    return false
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const result = await response.json()
    
    if (!response.ok) {
      console.error('Telegram API error:', result)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to send Telegram message:', error)
    return false
  }
}

export async function notifyJobApproved(job: any): Promise<boolean> {
  if (!TELEGRAM_PUBLIC_CHANNEL_ID) {
    console.warn('Public Telegram channel not configured')
    return false
  }

  const message = `🎉 *New Job Posted!*

*${job.jobTitle}* at *${job.companyName}*

📋 *Department:* ${job.department}
📍 *Location:* ${job.locationType}${job.location ? ` - ${job.location}` : ''}
💼 *Type:* ${job.jobType.replace('_', ' ')}
${job.salaryRange ? `💰 *Salary:* ${job.salaryRange}` : ''}

${job.companyDescription}

📞 *Contact:* ${job.companyContact}
${job.companyWebsite ? `🌐 *Website:* ${job.companyWebsite}` : ''}

#Jobs #${job.department} #${job.locationType}`

  return await sendTelegramMessage({
    chat_id: TELEGRAM_PUBLIC_CHANNEL_ID,
    text: message,
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  })
}

export async function notifyNewJobSubmission(job: any): Promise<boolean> {
  if (!TELEGRAM_ADMIN_CHANNEL_ID) {
    console.warn('Admin Telegram channel not configured')
    return false
  }

  const message = `🔔 *New Job Submission*

*${job.jobTitle}* at *${job.companyName}*

📋 *Department:* ${job.department}
📍 *Location:* ${job.locationType}${job.location ? ` - ${job.location}` : ''}
💼 *Type:* ${job.jobType.replace('_', ' ')}
${job.salaryRange ? `💰 *Salary:* ${job.salaryRange}` : ''}

*Company Description:*
${job.companyDescription}

📞 *Contact:* ${job.companyContact}
${job.companyWebsite ? `🌐 *Website:* ${job.companyWebsite}` : ''}

⏰ *Submitted:* ${new Date().toLocaleString()}

👤 *Status:* PENDING REVIEW

Please review and approve/reject in the admin panel.`

  return await sendTelegramMessage({
    chat_id: TELEGRAM_ADMIN_CHANNEL_ID,
    text: message,
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  })
}

export async function testTelegramConnection(): Promise<{ success: boolean; error?: string }> {
  if (!TELEGRAM_BOT_TOKEN) {
    return { success: false, error: 'Bot token not configured' }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`)
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.description || 'Unknown error' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}