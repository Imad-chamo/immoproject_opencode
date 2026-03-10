import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        client: { select: { id: true, name: true, email: true, phone: true } },
        inspector: true,
        report: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    if (session.user.role === "CLIENT" && order.clientId !== session.user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    if (session.user.role === "INSPECTOR" && order.inspectorId !== session.user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "INSPECTOR") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { status } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: params.id },
    })

    if (!order || order.inspectorId !== session.user.id) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
