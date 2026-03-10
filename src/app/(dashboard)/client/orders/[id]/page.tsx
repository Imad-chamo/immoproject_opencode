import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"
import { MapPin, Home, Calendar, FileText, Download, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession()

  if (!session || session.user.role !== "CLIENT") {
    redirect("/login")
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      inspector: true,
      report: true,
    },
  }) as any

  if (!order || order.clientId !== session.user.id) {
    notFound()
  }

  const statusSteps = [
    { status: "PENDING", label: "Commande reçue", icon: Clock },
    { status: "ASSIGNED", label: "Inspecteur assigné", icon: CheckCircle },
    { status: "IN_PROGRESS", label: "Inspection en cours", icon: FileText },
    { status: "QUALITY_CHECK", label: "Contrôle qualité", icon: AlertCircle },
    { status: "DELIVERED", label: "Rapport livré", icon: Download },
  ]

  const currentStep = statusSteps.findIndex(s => s.status === order.status)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/client/orders" className="text-gray-500 hover:text-gray-700">
          ← Retour
        </Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-2xl font-bold text-gray-900">Commande #{order.id.slice(-6)}</h1>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusLabel(order.status)}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la propriété</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{order.propertyAddress}</p>
                  <p className="text-sm text-gray-500">{order.propertyCity}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{order.propertyType}</p>
                  {order.surfaceArea > 0 && (
                    <p className="text-sm text-gray-500">{order.surfaceArea} m²</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Formule {order.formula}</p>
                  <p className="text-sm text-gray-500">Inspecté le {new Date(order.createdAt).toLocaleDateString("fr-MA")}</p>
                </div>
              </div>
            </div>
          </div>

          {order.inspector && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre inspecteur</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {order.inspector?.user?.name?.[0] || "I"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.inspector?.user?.name || "Inspecteur"}</p>
                  <p className="text-sm text-gray-500">
                    Badge {order.inspector?.badge}
                    {order.inspector?.rating && (
                      <span className="ml-2">★ {order.inspector.rating.toFixed(1)}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {order.report && order.status === "DELIVERED" && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Rapport d inspection</h2>
              {order.report.pdfUrl ? (
                <a
                  href={order.report.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le rapport PDF
                </a>
              ) : (
                <p className="text-gray-500">Le rapport sera bientôt disponible</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statut de la commande</h2>
            <div className="space-y-3">
              {statusSteps.map((step, idx) => (
                <div key={step.status} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    idx <= currentStep ? "bg-success text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={idx <= currentStep ? "text-gray-900" : "text-gray-500"}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Paiement</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Montant</span>
                <span className="font-semibold">{formatCurrency(order.clientPrice)} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mode</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Statut</span>
                <span className={`font-medium ${order.paymentStatus === "CONFIRMED" ? "text-success" : "text-yellow-600"}`}>
                  {order.paymentStatus === "CONFIRMED" ? "Confirmé" : "En attente"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
