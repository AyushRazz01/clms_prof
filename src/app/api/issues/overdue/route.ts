import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const now = new Date()
    
    const overdueIssues = await db.issue.findMany({
      where: {
        dueDate: {
          lt: now
        },
        status: 'ISSUED'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            isbn: true
          }
        }
      },
      orderBy: {
        dueDate: 'asc'
      }
    })

    return NextResponse.json(overdueIssues)
  } catch (error) {
    console.error('Error fetching overdue issues:', error)
    return NextResponse.json(
      { error: 'Failed to fetch overdue issues' },
      { status: 500 }
    )
  }
}
