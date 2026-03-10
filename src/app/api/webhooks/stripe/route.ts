import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 500 })
  }

  const Stripe = (await import("stripe")).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 })
  }

  const { prisma } = await import("@/lib/prisma")

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any
    
    if (session.metadata?.orderId) {
      await prisma.order.update({
        where: { id: session.metadata.orderId },
        data: {
          paymentStatus: "CONFIRMED",
        },
      })

      await prisma.notification.create({
        data: {
          userId: session.metadata.userId,
          type: "PAYMENT_CONFIRMED",
          title: "Paiement confirmé",
          message: "Votre paiement a été confirmé. Votre inspection sera bientôt assignée à un inspecteur.",
        },
      })
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as any
    
    if (session.metadata?.orderId) {
      await prisma.order.update({
        where: { id: session.metadata.orderId },
        data: {
          paymentStatus: "FAILED",
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
