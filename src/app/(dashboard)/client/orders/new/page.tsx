"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, MapPin, Home, FileText, CreditCard, Check, ChevronRight } from "lucide-react"
import { PRICING, MOROCCAN_CITIES } from "@/types"

type Formula = "ESSENTIEL" | "STANDARD" | "PREMIUM"
type PaymentMethod = "CARD" | "WAFACASH" | "WIRE"
type PropertyType = "apartment" | "house" | "villa" | "commercial"

const STEPS = [
  { id: 1, name: "Formule", icon: Shield },
  { id: 2, name: "Propriété", icon: Home },
  { id: 3, name: "Paiement", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: Check },
]

export default function NewOrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    formula: "" as Formula | "",
    propertyType: "" as PropertyType | "",
    propertyAddress: "",
    propertyCity: "",
    surfaceArea: "",
    notes: "",
    paymentMethod: "" as PaymentMethod | "",
  })

  const formulas = [
    { id: "ESSENTIEL" as Formula, name: "Essentiel", price: PRICING.ESSENTIEL.clientPrice, features: ["Structure", "Électricité", "Plomberie", "Rapport photo"] },
    { id: "STANDARD" as Formula, name: "Standard", price: PRICING.STANDARD.clientPrice, features: ["Tout Essentiel", "Humidité", "Valeur marché", "Estimation travaux"] },
    { id: "PREMIUM" as Formula, name: "Premium", price: PRICING.PREMIUM.clientPrice, features: ["Tout Standard", "Analyse juridique", "Rapport premium", "Suivi post-inspection"] },
  ]

  const propertyTypes = [
    { id: "apartment", name: "Appartement" },
    { id: "house", name: "Maison" },
    { id: "villa", name: "Villa" },
    { id: "commercial", name: "Commercial" },
  ]

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formula: formData.formula,
          propertyType: formData.propertyType,
          propertyAddress: formData.propertyAddress,
          propertyCity: formData.propertyCity,
          surfaceArea: parseInt(formData.surfaceArea) || 0,
          notes: formData.notes,
          paymentMethod: formData.paymentMethod,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Erreur lors de la création")
        return
      }

      if (formData.paymentMethod === "CARD" && data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        router.push(`/dashboard/client/orders/${data.orderId}?step=4`)
      }
    } catch (error) {
      console.error(error)
      alert("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Commander une inspection</h1>
        <div className="flex items-center justify-between">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step > s.id ? "bg-success text-white" : step === s.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm hidden sm:inline ${step >= s.id ? "text-gray-900" : "text-gray-500"}`}>
                {s.name}
              </span>
              {idx < STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > s.id ? "bg-success" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Choisissez votre formule</h2>
            <div className="grid gap-4">
              {formulas.map((formula) => (
                <label
                  key={formula.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.formula === formula.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="formula"
                        value={formula.id}
                        checked={formData.formula === formula.id}
                        onChange={(e) => setFormData({ ...formData, formula: e.target.value as Formula })}
                        className="w-4 h-4 text-primary"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{formula.name}</p>
                        <ul className="text-sm text-gray-500 mt-1">
                          {formula.features.map((f, i) => <li key={i}>• {f}</li>)}
                        </ul>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary">{formula.price} MAD</p>
                  </div>
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.formula}
              className="w-full btn-primary disabled:opacity-50"
            >
              Continuer <ChevronRight className="inline w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Détails de la propriété</h2>
            
            <div>
              <label className="label-field">Type de propriété</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: type.id as PropertyType })}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      formData.propertyType === type.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-field">Adresse</label>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                className="input-field"
                placeholder="Adresse complète"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Ville</label>
                <select
                  value={formData.propertyCity}
                  onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                  className="input-field"
                >
                  <option value="">Sélectionner</option>
                  {MOROCCAN_CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field">Surface (m²)</label>
                <input
                  type="number"
                  value={formData.surfaceArea}
                  onChange={(e) => setFormData({ ...formData, surfaceArea: e.target.value })}
                  className="input-field"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="label-field">Notes supplémentaires</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Informations supplémentaires..."
              />
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50">
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.propertyAddress || !formData.propertyCity || !formData.propertyType}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Continuer <ChevronRight className="inline w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Mode de paiement</h2>

            <div className="space-y-4">
              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === "CARD" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
              }`}>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="CARD"
                    checked={formData.paymentMethod === "CARD"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-4 h-4 text-primary"
                  />
                  <div>
                    <p className="font-semibold">Carte bancaire</p>
                    <p className="text-sm text-gray-500">Paiement sécurisé par Stripe</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-gray-400 ml-auto" />
                </div>
              </label>

              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === "WAFACASH" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
              }`}>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="WAFACASH"
                    checked={formData.paymentMethod === "WAFACASH"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-4 h-4 text-primary"
                  />
                  <div>
                    <p className="font-semibold">Wafacash / Jibi</p>
                    <p className="text-sm text-gray-500">Paiement en espèces dans un point de retrait</p>
                  </div>
                </div>
              </label>

              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === "WIRE" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
              }`}>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="WIRE"
                    checked={formData.paymentMethod === "WIRE"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-4 h-4 text-primary"
                  />
                  <div>
                    <p className="font-semibold">Virement bancaire</p>
                    <p className="text-sm text-gray-500">Virement depuis votre banque</p>
                  </div>
                </div>
              </label>
            </div>

            {formData.paymentMethod && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Récapitulatif</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{formData.formula} - {formData.propertyCity}</span>
                  <span className="text-2xl font-bold text-primary">
                    {formData.formula === "ESSENTIEL" ? PRICING.ESSENTIEL.clientPrice : 
                     formData.formula === "STANDARD" ? PRICING.STANDARD.clientPrice : PRICING.PREMIUM.clientPrice} MAD
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50">
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.paymentMethod || loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loading ? "Traitement..." : formData.paymentMethod === "CARD" ? "Payer maintenant" : "Confirmer la commande"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h2>
            <p className="text-gray-600 mb-6">
              Votre demande d'inspection a été enregistrée. Vous recevrez un email de confirmation.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-left max-w-sm mx-auto mb-6">
              <p className="text-sm text-gray-500">Prochaines étapes</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" /> Payment en cours de vérification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full" /> Assignation d'un inspecteur
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full" /> Inspection programmée
                </li>
              </ul>
            </div>
            <button onClick={() => router.push("/dashboard/client/orders")} className="btn-primary">
              Voir mes commandes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
