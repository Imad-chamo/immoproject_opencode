import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PRICING } from "@/types"

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { formula, propertyType, propertyAddress, propertyCity, surfaceArea, notes, paymentMethod } = await req.json()

    if (!formula || !propertyAddress || !propertyCity || !paymentMethod) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    const pricing = PRICING[formula as keyof typeof PRICING]
    const clientPrice = pricing.clientPrice
    const inspectorShare = pricing.inspectorShare
    const margin = clientPrice - inspectorShare

    const order = await prisma.order.create({
      data: {
        clientId: session.user.id,
        formula,
        propertyType: propertyType || "apartment",
        propertyAddress,
        propertyCity,
        surfaceArea: surfaceArea || 0,
        notes,
        clientPrice,
        inspectorShare,
        margin,
        paymentMethod,
        paymentStatus: "PENDING",
        status: "PENDING",
      },
    })

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "ORDER_CREATED",
        title: "Commande créée",
        message: `Votre commande #${order.id.slice(-6)} a été créée et attend confirmation.`,
      },
    })

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      clientPrice,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const where = session.user.role === "CLIENT" 
      ? { clientId: session.user.id }
      : session.user.role === "INSPECTOR"
      ? { inspectorId: session.user.id }
      : {}

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        client: { select: { id: true, name: true, email: true, phone: true } },
        inspector: true,
        report: true,
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
