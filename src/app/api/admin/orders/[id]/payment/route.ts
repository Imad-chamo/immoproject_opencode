import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { action } = await req.json()

    if (action === "confirm") {
      const order = await prisma.order.update({
        where: { id: params.id },
        data: { paymentStatus: "CONFIRMED" },
      })

      await prisma.notification.create({
        data: {
          userId: order.clientId,
          type: "PAYMENT_CONFIRMED",
          title: "Paiement confirmé",
          message: `Votre paiement pour la commande #${order.id.slice(-6)} a été confirmé.`,
        },
      })

      return NextResponse.json(order)
    }

    if (action === "reject") {
      const order = await prisma.order.update({
        where: { id: params.id },
        data: { 
          paymentStatus: "FAILED",
          status: "CANCELLED",
        },
      })

      return NextResponse.json(order)
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 })
  } catch (error) {
    console.error("Payment action error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
