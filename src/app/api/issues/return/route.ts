import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { BookStatus } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { issueId } = body

    if (!issueId) {
      return NextResponse.json(
        { error: 'Issue ID is required' },
        { status: 400 }
      )
    }

    // Get the issue details
    const issue = await db.issue.findUnique({
      where: { id: issueId },
      include: {
        book: true
      }
    })

    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      )
    }

    // Update issue status and return date
    const updatedIssue = await db.issue.update({
      where: { id: issueId },
      data: {
        returnDate: new Date(),
        status: BookStatus.AVAILABLE
      }
    })

    // Update book availability
    await db.book.update({
      where: { id: issue.bookId },
      data: {
        available: issue.book.available + 1
      }
    })

    return NextResponse.json({
      message: 'Book returned successfully',
      issue: updatedIssue
    })

  } catch (error) {
    console.error('Return book error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
