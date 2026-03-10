import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { DollarSign, FileText, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const session = await getSession()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  const [
    totalOrders,
    monthlyOrders,
    todayOrders,
    monthlyRevenue,
    todayRevenue,
    pendingPayments,
    pendingReports,
    totalInspectors,
    activeInspectors,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.order.aggregate({
      where: { 
        paymentStatus: "CONFIRMED",
        createdAt: { gte: startOfMonth },
      },
      _sum: { margin: true },
    }),
    prisma.order.aggregate({
      where: { 
        paymentStatus: "CONFIRMED",
        createdAt: { gte: startOfDay },
      },
      _sum: { margin: true },
    }),
    prisma.order.count({ 
      where: { 
        paymentStatus: "PENDING", 
        paymentMethod: { in: ["WAFACASH", "WIRE"] } 
      } 
    }),
    prisma.order.count({ where: { status: "QUALITY_CHECK" } }),
    prisma.inspectorProfile.count(),
    prisma.inspectorProfile.count({ where: { subscriptionStatus: "ACTIVE" } }),
  ])

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { name: true } },
      inspector: true,
    },
  }) as any

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Administrateur</h1>
        <p className="text-gray-600">Vue d'ensemble de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenus ce mois</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyRevenue._sum.margin || 0)}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Commandes ce mois</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyOrders}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Paiements en attente</p>
              <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inspecteurs actifs</p>
              <p className="text-2xl font-bold text-gray-900">{activeInspectors}/{totalInspectors}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Alertes</h2>
          </div>
          <div className="space-y-3">
            {pendingPayments > 0 && (
              <Link href="/dashboard/admin/orders?filter=pending-payment" className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800">{pendingPayments} paiements en attente de confirmation</span>
              </Link>
            )}
            {pendingReports > 0 && (
              <Link href="/dashboard/admin/orders?filter=quality-check" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">{pendingReports} rapports en attente de validation</span>
              </Link>
            )}
            {pendingPayments === 0 && pendingReports === 0 && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">Tout est à jour !</span>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
            <Link href="/dashboard/admin/orders" className="text-primary font-medium hover:underline">
              Voir toutes
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/admin/orders/${order.id}`}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.propertyCity}</p>
                  <p className="text-sm text-gray-500">{order.client.name}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{formatCurrency(order.clientPrice)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
