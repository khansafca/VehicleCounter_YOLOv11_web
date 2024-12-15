import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await req.json()
    
    const response = {
      timestamp: new Date().toISOString(),
      counts: {
        cars: Math.floor(Math.random() * 50),
        motorcycles: Math.floor(Math.random() * 30),
        trucks: Math.floor(Math.random() * 20)
      }
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { error: 'Failed to process video' },
      { status: 500 }
    )
  }
}