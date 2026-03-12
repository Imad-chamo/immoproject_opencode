import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, Home, FileText, Settings, LogOut, Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session || session.user.role !== "CLIENT") {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  })

  const pendingOrders = user?.orders.filter(o => o.status === "PENDING" || o.paymentStatus === "PENDING").length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">DariCheck</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard/client/orders" className="text-gray-600 hover:text-primary font-medium">
                Mes commandes
              </Link>
              <Link href="/dashboard/client/orders/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle inspection
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.name}</span>
              <Link href="/api/auth/signout" className="text-gray-400 hover:text-gray-600">
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
