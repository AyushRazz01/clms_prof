import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    let whereClause: any = {}
    
    // If userId is provided, filter by user (for students/faculty)
    if (userId) {
      whereClause.userId = userId
    }

    const issues = await db.issue.findMany({
      where: whereClause,
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
            isbn: true,
            rackNo: true
          }
        }
      },
      orderBy: {
        issueDate: 'desc'
      }
    })

    return NextResponse.json(issues)

  } catch (error) {
    console.error('Issues fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, bookId } = body

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if book exists and is available
    const book = await db.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    if (book.available === 0) {
      return NextResponse.json(
        { error: 'No copies available' },
        { status: 400 }
      )
    }

    // Check user's active issues
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        issues: {
          where: { returnDate: null }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check issue limit
    const issueLimit = user.role === 'STUDENT' ? 3 : 5
    if (user.issues.length >= issueLimit) {
      return NextResponse.json(
        { error: `You have reached your limit of ${issueLimit} books` },
        { status: 400 }
      )
    }

    // Calculate due date (7 days for students, 14 days for faculty)
    const now = new Date()
    const dueDate = new Date(now)
    dueDate.setDate(dueDate.getDate() + (user.role === 'STUDENT' ? 7 : 14))

    // Create issue record
    const issue = await db.issue.create({
      data: {
        userId,
        bookId,
        dueDate,
        status: 'ISSUED'
      }
    })

    // Update book availability
    await db.book.update({
      where: { id: bookId },
      data: {
        available: book.available - 1
      }
    })

    return NextResponse.json({
      message: 'Book issued successfully',
      issue
    })

  } catch (error) {
    console.error('Issue book error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
