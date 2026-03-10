import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateReferralCode } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    const { name, email, phone, password, role } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
        role: role || "CLIENT",
        referralCode: generateReferralCode(),
      },
    })

    if (role === "INSPECTOR") {
      await prisma.inspectorProfile.create({
        data: {
          userId: user.id,
          cities: [],
        },
      })
    }

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du compte" },
      { status: 500 }
    )
  }
}
