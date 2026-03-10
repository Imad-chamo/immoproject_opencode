import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") {
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

    return NextResponse.json(order)
  } catch (error) {
    console.error("Admin order fetch error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { inspectorId, status, inspectorShare } = await req.json()

    const margin = inspectorShare ? 
      (await prisma.order.findUnique({ where: { id: params.id } }))!.clientPrice - inspectorShare 
      : undefined

    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(inspectorId && { inspectorId }),
        ...(status && { status }),
        ...(inspectorShare && { inspectorShare }),
        ...(margin !== undefined && { margin }),
      },
    })

    if (inspectorId) {
      await prisma.notification.create({
        data: {
          userId: inspectorId,
          type: "NEW_MISSION",
          title: "Nouvelle mission assignée",
          message: `Une nouvelle inspection vous a été assignée: ${order.propertyAddress}`,
        },
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Admin order update error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
