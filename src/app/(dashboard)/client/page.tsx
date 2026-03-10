import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { Plus, FileText, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default async function ClientDashboardPage() {
  const session = await getSession()

  if (!session || session.user.role !== "CLIENT") {
    redirect("/login")
  }

  const orders = await prisma.order.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      inspector: true,
      report: true,
    },
  }) as any

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "PENDING").length,
    inProgress: orders.filter(o => o.status === "ASSIGNED" || o.status === "IN_PROGRESS").length,
    delivered: orders.filter(o => o.status === "DELIVERED").length,
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Gérez vos inspections immobilières</p>
        </div>
        <Link href="/dashboard/client/orders/new" className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle inspection
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total commandes</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">En attente</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              <p className="text-sm text-gray-500">En cours</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              <p className="text-sm text-gray-500">Livrées</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Dernières commandes</h2>
          <Link href="/dashboard/client/orders" className="text-primary font-medium hover:underline flex items-center gap-1">
            Voir toutes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Vous n'avez pas encore de commandes</p>
            <Link href="/dashboard/client/orders/new" className="btn-primary">
              Commander une inspection
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/client/orders/${order.id}`}
                className="block p-4 border border-gray-100 rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.propertyAddress}</p>
                    <p className="text-sm text-gray-500">{order.propertyCity} • {order.formula}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(order.clientPrice)} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
