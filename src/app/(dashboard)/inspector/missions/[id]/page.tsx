"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Home, FileText, CheckCircle, Camera, Star, AlertTriangle, ThumbsUp, ThumbsDown, DollarSign } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

type ChecklistSection = {
  name: string
  items: { name: string; rating: number; comment: string; photos: string[] }[]
}

const INITIAL_CHECKLIST: ChecklistSection[] = [
  {
    name: "Structure",
    items: [
      { name: "Murs", rating: 0, comment: "", photos: [] },
      { name: "Toiture", rating: 0, comment: "", photos: [] },
      { name: "Fondations", rating: 0, comment: "", photos: [] },
      { name: "Façade", rating: 0, comment: "", photos: [] },
    ],
  },
  {
    name: "Humidité & Infiltrations",
    items: [
      { name: "Humidité visible", rating: 0, comment: "", photos: [] },
      { name: "Infiltrations", rating: 0, comment: "", photos: [] },
      { name: "Ventilation", rating: 0, comment: "", photos: [] },
    ],
  },
  {
    name: "Installation Électrique",
    items: [
      { name: "Tableau électrique", rating: 0, comment: "", photos: [] },
      { name: "Prises et interrupteurs", rating: 0, comment: "", photos: [] },
      { name: "Mise à la terre", rating: 0, comment: "", photos: [] },
    ],
  },
  {
    name: "Plomberie",
    items: [
      { name: "Canalisations", rating: 0, comment: "", photos: [] },
      { name: "Robinetterie", rating: 0, comment: "", photos: [] },
      { name: "Chauffage/Eau chaude", rating: 0, comment: "", photos: [] },
    ],
  },
  {
    name: "Menuiserie",
    items: [
      { name: "Fenêtres", rating: 0, comment: "", photos: [] },
      { name: "Portes", rating: 0, comment: "", photos: [] },
      { name: "Volets", rating: 0, comment: "", photos: [] },
    ],
  },
]

export default function MissionReportPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [checklist, setChecklist] = useState<ChecklistSection[]>(INITIAL_CHECKLIST)
  const [generalRating, setGeneralRating] = useState(0)
  const [inspectorNotes, setInspectorNotes] = useState("")
  const [estimatedRepairMin, setEstimatedRepairMin] = useState("")
  const [estimatedRepairMax, setEstimatedRepairMax] = useState("")
  const [estimatedMarketValue, setEstimatedMarketValue] = useState("")
  const [recommendation, setRecommendation] = useState<"BUY" | "NEGOTIATE" | "AVOID" | "">("")

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data)
        if (data.report?.checklistData) {
          setChecklist(data.report.checklistData)
        }
        if (data.report) {
          setInspectorNotes(data.report.inspectorNotes || "")
          setEstimatedRepairMin(data.report.estimatedRepairCostMin?.toString() || "")
          setEstimatedRepairMax(data.report.estimatedRepairCostMax?.toString() || "")
          setEstimatedMarketValue(data.report.estimatedMarketValue?.toString() || "")
          setRecommendation(data.report.recommendation as any)
        }
        setLoading(false)
      })
  }, [params.id])

  const updateChecklistItem = (sectionIdx: number, itemIdx: number, field: string, value: any) => {
    const newChecklist = [...checklist]
    ;(newChecklist[sectionIdx].items[itemIdx] as any)[field] = value
    setChecklist(newChecklist)
  }

  const handleStatusUpdate = async (newStatus: string) => {
    await fetch(`/api/orders/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
  }

  const handleSubmitReport = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: params.id,
          checklistData: checklist,
          generalRating,
          inspectorNotes,
          estimatedRepairCostMin: parseInt(estimatedRepairMin) || 0,
          estimatedRepairCostMax: parseInt(estimatedRepairMax) || 0,
          estimatedMarketValue: parseInt(estimatedMarketValue) || 0,
          recommendation,
        }),
      })

      if (res.ok) {
        handleStatusUpdate("QUALITY_CHECK")
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>
  }

  if (!order) {
    return <div className="p-8 text-center">Mission non trouvée</div>
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
          ← Retour
        </button>
        <span className="text-gray-300">|</span>
        <h1 className="text-2xl font-bold text-gray-900">Mission #{order.id.slice(-6)}</h1>
      </div>

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
            <p>{order.propertyType} • {order.formula}</p>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-success" />
            <p className="font-semibold text-success">Votre rémunération: {formatCurrency(order.inspectorShare)} MAD</p>
          </div>
        </div>
      </div>

      {order.status === "ASSIGNED" && (
        <div className="card bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Actions disponibles</h2>
          <button
            onClick={() => handleStatusUpdate("IN_PROGRESS")}
            className="w-full btn-primary"
          >
            Accepter et commencer l inspection
          </button>
        </div>
      )}

      {order.status === "IN_PROGRESS" && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Checklist d inspection</h2>
            
            {checklist.map((section, sectionIdx) => (
              <div key={section.name} className="mb-8 last:mb-0">
                <h3 className="font-medium text-gray-700 mb-4 pb-2 border-b">{section.name}</h3>
                <div className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <div key={item.name} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => updateChecklistItem(sectionIdx, itemIdx, "rating", rating)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                item.rating >= rating
                                  ? "bg-primary text-white"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={item.comment}
                        onChange={(e) => updateChecklistItem(sectionIdx, itemIdx, "comment", e.target.value)}
                        placeholder="Commentaires..."
                        className="input-field text-sm"
                        rows={2}
                      />
                      <button className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline">
                        <Camera className="w-4 h-4" />
                        Ajouter des photos
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Évaluation globale</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600">Note globale:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setGeneralRating(rating)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      generalRating >= rating
                        ? "bg-accent text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <Star className="w-5 h-5" fill={generalRating >= rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="label-field">Coût réparation estimé (min)</label>
                <input
                  type="number"
                  value={estimatedRepairMin}
                  onChange={(e) => setEstimatedRepairMin(e.target.value)}
                  className="input-field"
                  placeholder="0 MAD"
                />
              </div>
              <div>
                <label className="label-field">Coût réparation estimé (max)</label>
                <input
                  type="number"
                  value={estimatedRepairMax}
                  onChange={(e) => setEstimatedRepairMax(e.target.value)}
                  className="input-field"
                  placeholder="0 MAD"
                />
              </div>
              <div>
                <label className="label-field">Valeur marché estimée</label>
                <input
                  type="number"
                  value={estimatedMarketValue}
                  onChange={(e) => setEstimatedMarketValue(e.target.value)}
                  className="input-field"
                  placeholder="0 MAD"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="label-field">Notes de l inspecteur</label>
              <textarea
                value={inspectorNotes}
                onChange={(e) => setInspectorNotes(e.target.value)}
                className="input-field"
                rows={4}
                placeholder="Observations supplémentaires..."
              />
            </div>

            <div className="mb-6">
              <label className="label-field mb-3">Recommandation finale</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setRecommendation("BUY")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    recommendation === "BUY" ? "border-success bg-success/10" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <ThumbsUp className={`w-8 h-8 ${recommendation === "BUY" ? "text-success" : "text-gray-400"}`} />
                  <span className={`font-medium ${recommendation === "BUY" ? "text-success" : "text-gray-600"}`}>
                    Acheter
                  </span>
                </button>
                <button
                  onClick={() => setRecommendation("NEGOTIATE")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    recommendation === "NEGOTIATE" ? "border-accent bg-accent/10" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <AlertTriangle className={`w-8 h-8 ${recommendation === "NEGOTIATE" ? "text-accent" : "text-gray-400"}`} />
                  <span className={`font-medium ${recommendation === "NEGOTIATE" ? "text-accent" : "text-gray-600"}`}>
                    Négocier
                  </span>
                </button>
                <button
                  onClick={() => setRecommendation("AVOID")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    recommendation === "AVOID" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <ThumbsDown className={`w-8 h-8 ${recommendation === "AVOID" ? "text-red-500" : "text-gray-400"}`} />
                  <span className={`font-medium ${recommendation === "AVOID" ? "text-red-500" : "text-gray-600"}`}>
                    Éviter
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmitReport}
              disabled={submitting}
              className="w-full btn-primary disabled:opacity-50"
            >
              {submitting ? "Soumission..." : "Soumettre le rapport"}
            </button>
          </div>
        </div>
      )}

      {(order.status === "QUALITY_CHECK" || order.status === "DELIVERED") && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-success" />
            <div>
              <p className="font-medium text-green-900">Rapport soumis</p>
              <p className="text-sm text-green-700">
                {order.status === "QUALITY_CHECK" 
                  ? "En attente de validation par l'administration" 
                  : "Rapport validé et livré au client"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
