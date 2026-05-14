import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

const PRODUCTS: Record<string, { name: string; price: number; emoji: string }> = {
  rosa:      { name: 'Rosa',      price: 99,  emoji: '🌹' },
  ramalhete: { name: 'Ramalhete', price: 299, emoji: '💐' },
  girassol:  { name: 'Girassol', price: 149, emoji: '🌻' },
  vela:      { name: 'Vela acesa', price: 99, emoji: '🕯' },
  coroa:     { name: 'Coroa',     price: 499, emoji: '🌸' },
  surpresa:  { name: 'Surpresa',  price: 199, emoji: '🎁' },
}

export async function POST(req: NextRequest) {
  try {
    const { productId, message, memorialSlug } = await req.json()
    const product = PRODUCTS[productId]
    if (!product) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.emoji} ${product.name}`,
            description: message || `Oferta para o memorial de ${memorialSlug}`,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      }],
      metadata: { productId, message: message || '', memorialSlug },
      success_url: `${baseUrl}/memorial?payment=success`,
      cancel_url: `${baseUrl}/flores`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}