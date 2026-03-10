import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { action, adminNotes } = await req.json()

    if (action === "approve") {
      const report = await prisma.report.update({
        where: { orderId: params.id },
        data: {
          status: "APPROVED",
          approvedAt: new Date(),
          adminNotes,
        },
      })

      const order = await prisma.order.update({
        where: { id: params.id },
        data: {
          status: "DELIVERED",
          deliveredAt: new Date(),
        },
      })

      const updatedOrder = await prisma.order.findUnique({
        where: { id: params.id },
        include: { client: true },
      })

      if (updatedOrder?.clientId) {
        await prisma.notification.create({
          data: {
            userId: updatedOrder.clientId,
            type: "REPORT_DELIVERED",
            title: "Rapport d inspection livré",
            message: `Votre rapport d'inspection pour ${order.propertyAddress} est disponible.`,
          },
        })
      }

      return NextResponse.json({ report, order })
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 })
  } catch (error) {
    console.error("Report approval error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
