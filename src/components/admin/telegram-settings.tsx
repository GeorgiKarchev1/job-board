'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, MessageCircle, Loader2 } from 'lucide-react'

export function TelegramSettings() {
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  const testConnection = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/admin/telegram/test')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({ 
        success: false, 
        error: 'Failed to test connection' 
      })
    } finally {
      setTesting(false)
    }
  }

  const isConfigured = process.env.NEXT_PUBLIC_TELEGRAM_CONFIGURED === 'true'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>Telegram Integration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Bot Status</p>
            <p className="text-sm text-muted-foreground">
              Notifications for job approvals and submissions
            </p>
          </div>
          <Badge variant={isConfigured ? 'default' : 'secondary'}>
            {isConfigured ? 'Configured' : 'Not Configured'}
          </Badge>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={testConnection}
            disabled={testing}
            variant="outline"
            className="w-full"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              'Test Telegram Connection'
            )}
          </Button>

          {testResult && (
            <div className={`flex items-center space-x-2 p-3 rounded-md ${
              testResult.success 
                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
            }`}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <span className="text-sm">
                {testResult.success ? testResult.message : testResult.error}
              </span>
            </div>
          )}
        </div>

        {!isConfigured && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
              Setup Required:
            </p>
            <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
              <li>• Create a Telegram bot with @BotFather</li>
              <li>• Add TELEGRAM_BOT_TOKEN to environment variables</li>
              <li>• Add TELEGRAM_PUBLIC_CHANNEL_ID for job announcements</li>
              <li>• Add TELEGRAM_ADMIN_CHANNEL_ID for admin notifications</li>
            </ul>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Public Channel:</strong> Approved jobs are posted here</p>
          <p><strong>Admin Channel:</strong> New submissions are notified here</p>
        </div>
      </CardContent>
    </Card>
  )
}