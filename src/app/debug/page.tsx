'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DebugPage() {
  const router = useRouter()
  const [storageData, setStorageData] = useState<any>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = {
        sessionStorage: {
          user: sessionStorage.getItem('user'),
          token: sessionStorage.getItem('token'),
          redirectCount: sessionStorage.getItem('redirectCount'),
          authError: sessionStorage.getItem('authError')
        },
        localStorage: {
          user: localStorage.getItem('user'),
          token: localStorage.getItem('token')
        },
        urlParams: window.location.search
      }
      setStorageData(data)
    }
  }, [])

  const clearAll = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
  }

  const testLogin = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔍 Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">SessionStorage:</h3>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(storageData.sessionStorage, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">LocalStorage:</h3>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(storageData.localStorage, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">URL Parameters:</h3>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded text-xs">
                {storageData.urlParams || 'None'}
              </pre>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={clearAll} variant="destructive">
                Clear All Storage
              </Button>
              <Button onClick={testLogin}>
                Go to Login
              </Button>
              <Button onClick={() => router.push('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
