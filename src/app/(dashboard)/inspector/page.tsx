import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { FileText, MapPin, Clock, CheckCircle, AlertCircle, TrendingUp, Star } from "lucide-react"

export default async function InspectorDashboardPage() {
  const session = await getSession()

  if (!session || session.user.role !== "INSPECTOR") {
    redirect("/login")
  }

  const profile = await prisma.inspectorProfile.findUnique({
    where: { userId: session.user.id },
  })

  const orders = await prisma.order.findMany({
    where: { inspectorId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { report: true },
  })

  const activeOrders = orders.filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED")
  const completedOrders = orders.filter(o => o.status === "DELIVERED")
  const totalEarnings = completedOrders.reduce((sum, o) => sum + o.inspectorShare, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Gérez vos missions d inspection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeOrders.length}</p>
              <p className="text-sm text-gray-500">Missions actives</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedOrders.length}</p>
              <p className="text-sm text-gray-500">Missions complétées</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</p>
              <p className="text-sm text-gray-500">Total gagné</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{profile?.rating.toFixed(1) || "0.0"}</p>
              <p className="text-sm text-gray-500">Note moyenne</p>
            </div>
          </div>
        </div>
      </div>

      {profile?.subscriptionStatus !== "ACTIVE" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Abonnement inactif</p>
              <p className="text-sm text-yellow-700">Renouvelez votre abonnement pour recevoir de nouvelles missions</p>
            </div>
            <Link href="/dashboard/inspector/subscription" className="ml-auto btn-accent text-sm">
              Renouveler
            </Link>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Missions en cours</h2>
          <Link href="/dashboard/inspector/missions" className="text-primary font-medium hover:underline">
            Voir toutes
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune mission active</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/inspector/missions/${order.id}`}
                className="block p-4 border border-gray-100 rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900">{order.propertyAddress}</p>
                    <p className="text-sm text-gray-500">{order.propertyCity} • {order.formula}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{formatCurrency(order.inspectorShare)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("fr-MA")}</p>
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
