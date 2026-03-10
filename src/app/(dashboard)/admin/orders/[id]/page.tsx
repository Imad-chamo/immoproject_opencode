"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Home, User, CreditCard, FileText, CheckCircle, XCircle, Download, Send } from "lucide-react"
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/utils"

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [inspectors, setInspectors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedInspector, setSelectedInspector] = useState("")
  const [cashAmount, setCashAmount] = useState("")
  const [adminNotes, setAdminNotes] = useState("")

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data)
        if (data.inspector) {
          setSelectedInspector(data.inspector.id)
        }
        setLoading(false)
      })

    fetch("/api/inspectors")
      .then(res => res.json())
      .then(data => setInspectors(data))
  }, [params.id])

  const handleAssignInspector = async () => {
    if (!selectedInspector || !cashAmount) return
    setSubmitting(true)
    
    const res = await fetch(`/api/admin/orders/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        inspectorId: selectedInspector,
        status: "ASSIGNED",
        inspectorShare: parseInt(cashAmount),
      }),
    })

    if (res.ok) {
      router.refresh()
    }
    setSubmitting(false)
  }

  const handleConfirmPayment = async () => {
    setSubmitting(true)
    const res = await fetch(`/api/admin/orders/${params.id}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "confirm" }),
    })

    if (res.ok) {
      router.refresh()
    }
    setSubmitting(false)
  }

  const handleApproveReport = async () => {
    setSubmitting(true)
    const res = await fetch(`/api/admin/orders/${params.id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        action: "approve",
        adminNotes,
      }),
    })

    if (res.ok) {
      router.refresh()
    }
    setSubmitting(false)
  }

  const handleRejectPayment = async () => {
    setSubmitting(true)
    const res = await fetch(`/api/admin/orders/${params.id}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject" }),
    })

    if (res.ok) {
      router.refresh()
    }
    setSubmitting(false)
  }

  if (loading) return <div className="p-8 text-center">Chargement...</div>
  if (!order) return <div className="p-8 text-center">Commande non trouvée</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
          ← Retour
        </button>
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
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{order.propertyAddress}</p>
                  <p className="text-sm text-gray-500">{order.propertyCity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-400" />
                <p>{order.propertyType} • {order.formula} • {order.surfaceArea} m²</p>
              </div>
              {order.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-600">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Client</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {order.client?.name?.[0]}
              </div>
              <div>
                <p className="font-medium">{order.client?.name}</p>
                <p className="text-sm text-gray-500">{order.client?.email}</p>
                <p className="text-sm text-gray-500">{order.client?.phone}</p>
              </div>
            </div>
          </div>

          {order.report && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Rapport d inspection</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Statut du rapport</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.report.status === "APPROVED" ? "bg-green-100 text-green-700" :
                    order.report.status === "SUBMITTED" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {order.report.status}
                  </span>
                </div>
                {order.report.recommendation && (
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Recommandation</p>
                    <p className={`font-semibold ${
                      order.report.recommendation === "BUY" ? "text-green-600" :
                      order.report.recommendation === "NEGOTIATE" ? "text-accent" :
                      "text-red-600"
                    }`}>
                      {order.report.recommendation === "BUY" ? "✅ Acheter" :
                       order.report.recommendation === "NEGOTIATE" ? "⚠️ Négocier" : "❌ Éviter"}
                    </p>
                  </div>
                )}
                {order.report.estimatedRepairCostMin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-500">Coût réparation</p>
                      <p className="font-medium">
                        {formatCurrency(order.report.estimatedRepairCostMin)} - {formatCurrency(order.report.estimatedRepairCostMax)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-500">Valeur marché</p>
                      <p className="font-medium">{formatCurrency(order.report.estimatedMarketValue)}</p>
                    </div>
                  </div>
                )}
                {order.report.inspectorNotes && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Notes de l inspecteur</p>
                    <p className="text-gray-700">{order.report.inspectorNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {order.status === "PENDING" && order.paymentMethod !== "CARD" && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirmation paiement</h2>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Mode de paiement</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleConfirmPayment}
                    disabled={submitting}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={handleRejectPayment}
                    disabled={submitting}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          )}

          {order.status === "PENDING" && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigner un inspecteur</h2>
              <div className="space-y-4">
                <div>
                  <label className="label-field">Inspecteur</label>
                  <select
                    value={selectedInspector}
                    onChange={(e) => setSelectedInspector(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Sélectionner...</option>
                    {inspectors.map((inspector: any) => (
                      <option key={inspector.id} value={inspector.id}>
                        {inspector.user?.name} - {inspector.badge} ({inspector.cities?.join(", ")})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field">Rémunération inspecteur (MAD)</label>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="input-field"
                    placeholder="600"
                  />
                </div>
                <button
                  onClick={handleAssignInspector}
                  disabled={submitting || !selectedInspector || !cashAmount}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  Assigner et confirmer
                </button>
              </div>
            </div>
          )}

          {order.report?.status === "SUBMITTED" && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Valider le rapport</h2>
              <div className="space-y-4">
                <div>
                  <label className="label-field">Notes admin</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="input-field"
                    rows={3}
                    placeholder="Notes pour le rapport..."
                  />
                </div>
                <button
                  onClick={handleApproveReport}
                  disabled={submitting}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  Valider et livrrer
                </button>
              </div>
            </div>
          )}

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Prix client</span>
                <span className="font-medium">{formatCurrency(order.clientPrice)} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Part inspecteur</span>
                <span className="font-medium">{formatCurrency(order.inspectorShare)} MAD</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">Marge</span>
                <span className="font-bold text-success">{formatCurrency(order.margin)} MAD</span>
              </div>
            </div>
          </div>

          {order.report?.status === "APPROVED" && order.report?.pdfUrl && (
            <a
              href={order.report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary inline-flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger PDF
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
