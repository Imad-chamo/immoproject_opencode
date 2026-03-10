import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const filter = searchParams.get("filter")

    const where: any = {}

    if (filter === "pending") {
      where.approved = false
    }

    if (filter === "active") {
      where.subscriptionStatus = "ACTIVE"
    }

    const inspectors = await prisma.user.findMany({
      where: { role: "INSPECTOR" },
      include: {
        inspectorProfile: true,
        orders: {
          where: { status: "DELIVERED" },
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(inspectors)
  } catch (error) {
    console.error("Inspectors fetch error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { inspectorId, action, subscriptionStatus } = await req.json()

    if (action === "approve") {
      const profile = await prisma.inspectorProfile.update({
        where: { userId: inspectorId },
        data: { approved: true },
      })

      await prisma.notification.create({
        data: {
          userId: inspectorId,
          type: "PROFILE_APPROVED",
          title: "Profil approuvé",
          message: "Votre profil a été approuvé. Vous pouvez maintenant accepter des missions.",
        },
      })

      return NextResponse.json(profile)
    }

    if (action === "suspend") {
      const profile = await prisma.inspectorProfile.update({
        where: { userId: inspectorId },
        data: { isActive: false },
      })

      return NextResponse.json(profile)
    }

    if (action === "activate") {
      const profile = await prisma.inspectorProfile.update({
        where: { userId: inspectorId },
        data: { isActive: true },
      })

      return NextResponse.json(profile)
    }

    if (action === "setSubscription") {
      const profile = await prisma.inspectorProfile.update({
        where: { userId: inspectorId },
        data: { subscriptionStatus },
      })

      return NextResponse.json(profile)
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 })
  } catch (error) {
    console.error("Inspector update error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
