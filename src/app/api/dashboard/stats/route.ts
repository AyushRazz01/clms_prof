import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const role = searchParams.get('role')

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    let stats: any = {
      issuedBooks: 0,
      overdueBooks: 0,
      fines: 0,
      totalBooks: 0
    }

    const now = new Date()

    if (role === 'STUDENT' || role === 'FACULTY') {
      // Get user's active issues
      const activeIssues = await db.issue.findMany({
        where: {
          userId: userId,
          returnDate: null
        }
      })

      stats.issuedBooks = activeIssues.length

      // Get overdue books
      stats.overdueBooks = activeIssues.filter(issue => issue.dueDate < now).length

      // Get total fines
      const fines = await db.fine.findMany({
        where: {
          userId: userId,
          status: 'PENDING'
        }
      })

      stats.fines = fines.reduce((sum, fine) => sum + fine.amount, 0)

    } else if (role === 'LIBRARIAN' || role === 'ADMIN') {
      // Get total books
      const books = await db.book.findMany()
      stats.totalBooks = books.length

      // Get active issues
      const activeIssues = await db.issue.findMany({
        where: { returnDate: null }
      })
      stats.issuedBooks = activeIssues.length

      // Get overdue books
      stats.overdueBooks = activeIssues.filter(issue => issue.dueDate < now).length

      // Get total pending fines
      const fines = await db.fine.findMany({
        where: { status: 'PENDING' }
      })
      stats.fines = fines.reduce((sum, fine) => sum + fine.amount, 0)
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
