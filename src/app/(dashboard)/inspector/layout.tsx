import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, FileText, MapPin, Settings, LogOut, DollarSign, Star } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function InspectorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session || session.user.role !== "INSPECTOR") {
    redirect("/login")
  }

  const profile = await prisma.inspectorProfile.findUnique({
    where: { userId: session.user.id },
  })

  if (!profile?.approved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil en attente d'approbation</h1>
          <p className="text-gray-600 mb-6">
            Votre profil est en cours de vérification par notre équipe. Vous recevrez une notification lorsqu'il sera approuvé.
          </p>
          <Link href="/login" className="btn-primary">
            Se déconnecter
          </Link>
        </div>
      </div>
    )
  }

  const missions = await prisma.order.findMany({
    where: { 
      inspectorId: session.user.id,
      status: { not: "DELIVERED" },
    },
    orderBy: { createdAt: "desc" },
  })

  const completedMissions = await prisma.order.count({
    where: { 
      inspectorId: session.user.id,
      status: "DELIVERED",
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Immo Verify<span className="text-accent">Maroc</span></span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard/inspector/missions" className="hover:text-white/80 font-medium">
                Mes missions ({missions.length})
              </Link>
              <Link href="/dashboard/inspector/earnings" className="hover:text-white/80 font-medium">
                Revenus
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">{profile.badge}</span>
              <Link href="/api/auth/signout" className="text-white/60 hover:text-white">
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

import { Clock } from "lucide-react"
