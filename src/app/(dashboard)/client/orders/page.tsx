import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { FileText, ChevronRight, Search, Filter } from "lucide-react"

export default async function OrdersListPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes commandes</h1>
          <p className="text-gray-600">Suivez l'état de vos inspections</p>
        </div>
        <Link href="/dashboard/client/orders/new" className="btn-primary">
          Nouvelle inspection
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="input-field pl-10"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Aucune commande</p>
            <Link href="/dashboard/client/orders/new" className="btn-primary">
              Commander une inspection
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/client/orders/${order.id}`}
                className="block p-4 border border-gray-100 rounded-lg hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-sm text-gray-500">#{order.id.slice(-6)}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{order.propertyAddress}</h3>
                    <p className="text-sm text-gray-500">{order.propertyCity} • {order.formula}</p>
                    {order.inspector && (
                      <p className="text-sm text-gray-600 mt-2">
                        Inspecteur: {order.inspector.user?.name || "Assigné"}
                        <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent rounded text-xs">
                          {order.inspector.badge}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{formatCurrency(order.clientPrice)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("fr-MA")}</p>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto mt-2" />
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
