import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "INSPECTOR") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { orderId, checklistData, generalRating, inspectorNotes, estimatedRepairCostMin, estimatedRepairCostMax, estimatedMarketValue, recommendation } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order || order.inspectorId !== session.user.id) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    let report = await prisma.report.findUnique({
      where: { orderId },
    })

    if (report) {
      report = await prisma.report.update({
        where: { id: report.id },
        data: {
          checklistData,
          inspectorNotes,
          estimatedRepairCostMin,
          estimatedRepairCostMax,
          estimatedMarketValue,
          recommendation,
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      })
    } else {
      report = await prisma.report.create({
        data: {
          orderId,
          inspectorId: session.user.id,
          checklistData,
          inspectorNotes,
          estimatedRepairCostMin,
          estimatedRepairCostMax,
          estimatedMarketValue,
          recommendation,
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      })
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "QUALITY_CHECK" },
    })

    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error("Report submission error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const report = await prisma.report.findUnique({
      where: { orderId: params.id },
      include: {
        inspector: true,
        order: true,
      },
    })

    if (!report) {
      return NextResponse.json({ error: "Rapport non trouvé" }, { status: 404 })
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Report fetch error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
