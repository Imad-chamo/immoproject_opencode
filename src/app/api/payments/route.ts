import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe non configuré" }, { status: 500 })
    }

    const session = await getSession()
    if (!session || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { orderId } = await req.json()

    const { prisma } = await import("@/lib/prisma")

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order || order.clientId !== session.user.id) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    if (order.paymentMethod !== "CARD") {
      return NextResponse.json({ error: "Mode de paiement invalide" }, { status: 400 })
    }

    const Stripe = (await import("stripe")).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const sessionStripe = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mad",
            product_data: {
              name: `Inspection ${order.formula} - ${order.propertyAddress}`,
              description: `Propriété à ${order.propertyCity}`,
            },
            unit_amount: order.clientPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/client/orders/${orderId}?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/client/orders/${orderId}?payment=cancelled`,
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ url: sessionStripe.url })
  } catch (error) {
    console.error("Stripe payment error:", error)
    return NextResponse.json({ error: "Erreur de paiement" }, { status: 500 })
  }
}
