import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, FileText, Users, CreditCard, Settings, LogOut, TrendingUp, DollarSign, Package } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const pendingPayments = await prisma.order.count({
    where: { paymentStatus: "PENDING", paymentMethod: { in: ["WAFACASH", "WIRE"] } },
  })

  const pendingReports = await prisma.order.count({
    where: { status: "QUALITY_CHECK" },
  })

  const pendingInspectors = await prisma.inspectorProfile.count({
    where: { approved: false },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">DariCheck</span>
              <span className="ml-2 px-2 py-0.5 bg-accent text-xs rounded">ADMIN</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard/admin" className="hover:text-white/80 font-medium">Overview</Link>
              <Link href="/dashboard/admin/orders" className="hover:text-white/80 font-medium">Commandes</Link>
              <Link href="/dashboard/admin/inspectors" className="hover:text-white/80 font-medium">Inspecteurs</Link>
              <Link href="/dashboard/admin/subscriptions" className="hover:text-white/80 font-medium">Abonnements</Link>
            </nav>
            <div className="flex items-center gap-4">
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
