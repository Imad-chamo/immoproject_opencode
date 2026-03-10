import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { FileText, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default async function InspectorMissionsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "INSPECTOR") {
    redirect("/login")
  }

  const orders = await prisma.order.findMany({
    where: { 
      inspectorId: session.user.id,
    },
    orderBy: { createdAt: "desc" },
    include: { report: true },
  })

  const activeOrders = orders.filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED")
  const completedOrders = orders.filter(o => o.status === "DELIVERED" || o.status === "CANCELLED")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes missions</h1>
        <p className="text-gray-600">Gérez vos inspections</p>
      </div>

      <div className="grid gap-6">
        {activeOrders.length > 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Missions actives</h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/inspector/missions/${order.id}`}
                  className="block p-4 border border-gray-100 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                        <span className="text-sm text-gray-500">#{order.id.slice(-6)}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{order.propertyAddress}</h3>
                      <p className="text-sm text-gray-500">{order.propertyCity} • {order.formula}</p>
                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {order.propertyType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success text-lg">{formatCurrency(order.inspectorShare)}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("fr-MA")}</p>
                      {order.status === "ASSIGNED" && (
                        <span className="inline-flex items-center mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          À accepter
                        </span>
                      )}
                      {(order.status === "IN_PROGRESS" || order.status === "QUALITY_CHECK") && (
                        <span className="inline-flex items-center mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Rapport en cours
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique des missions</h2>
          {completedOrders.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune mission terminée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/inspector/missions/${order.id}`}
                  className="block p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{order.propertyAddress}</p>
                      <p className="text-sm text-gray-500">{order.propertyCity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-600">{formatCurrency(order.inspectorShare)}</p>
                      <p className="text-sm text-gray-500">{new Date(order.deliveredAt || order.createdAt).toLocaleDateString("fr-MA")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
