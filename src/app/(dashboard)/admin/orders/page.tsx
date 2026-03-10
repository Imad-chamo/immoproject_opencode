import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { FileText, Search, Filter, MapPin, User, ChevronRight } from "lucide-react"

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { filter?: string; status?: string; city?: string }
}) {
  const session = await getSession()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const where: Record<string, any> = {}

  if (searchParams.status) {
    where.status = searchParams.status
  }

  if (searchParams.city) {
    where.propertyCity = searchParams.city
  }

  if (searchParams.filter === "pending-payment") {
    where.paymentStatus = "PENDING"
    where.paymentMethod = { in: ["WAFACASH", "WIRE"] }
  }

  if (searchParams.filter === "quality-check") {
    where.status = "QUALITY_CHECK"
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, email: true, phone: true } },
      inspector: true,
    },
  }) as any

  const cities = await prisma.order.findMany({
    select: { propertyCity: true },
    distinct: ["propertyCity"],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>
          <p className="text-gray-600">{orders.length} commandes</p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par adresse, ville..."
              className="input-field pl-10"
            />
          </div>
          
          <Link
            href="/dashboard/admin/orders?filter=pending-payment"
            className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 font-medium"
          >
            Paiements en attente
          </Link>
          <Link
            href="/dashboard/admin/orders?filter=quality-check"
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium"
          >
            En contrôle qualité
          </Link>
          <Link
            href="/dashboard/admin/orders"
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Toutes
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Client</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Propriété</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Formule</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Montant</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Paiement</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(orders as any[]).map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">#{order.id.slice(-6)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{order.client.name}</p>
                    <p className="text-sm text-gray-500">{order.client.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">{order.propertyAddress}</p>
                    <p className="text-sm text-gray-500">{order.propertyCity}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.formula}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{formatCurrency(order.clientPrice)}</p>
                    <p className="text-xs text-gray-500">Marge: {formatCurrency(order.margin)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${order.paymentStatus === "CONFIRMED" ? "text-green-600" : "text-yellow-600"}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("fr-MA")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/admin/orders/${order.id}`}
                      className="text-primary hover:underline"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune commande trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}
