import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const available = searchParams.get('available')

    const where: any = {}

    if (category && category !== 'all') {
      where.categoryId = category
    }

    if (available === 'true') {
      where.available = {
        gt: 0
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { author: { contains: search } },
        { isbn: { contains: search } }
      ]
    }

    const books = await db.book.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        title: 'asc'
      }
    })

    return NextResponse.json({ books })

  } catch (error) {
    console.error('Books fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
