import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { v4 as uuidv4 } from 'uuid'

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const collection = db.collection('newsletter_subscribers')

    // Check if email already exists
    const existing = await collection.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json(
        { message: 'You\'re already subscribed!' },
        { status: 200 }
      )
    }

    // Insert new subscriber
    await collection.insertOne({
      id: uuidv4(),
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      source: 'website'
    })

    return NextResponse.json(
      { message: 'Thanks for subscribing!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// GET - Get subscriber count (optional, for admin)
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('newsletter_subscribers')
    const count = await collection.countDocuments()

    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error fetching subscriber count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch count' },
      { status: 500 }
    )
  }
}
