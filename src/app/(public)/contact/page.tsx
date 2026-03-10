"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Immo Verify<span className="text-accent">Maroc</span></span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/tarifs" className="text-gray-600 hover:text-primary font-medium">Tarifs</Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-primary font-medium">À propos</Link>
              <Link href="/login" className="text-gray-600 hover:text-primary font-medium">Connexion</Link>
              <Link href="/register" className="btn-primary">Commander</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600">
            Nous sommes disponibles pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <div className="card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                  <p className="text-gray-600">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-field">Nom complet</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-field">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-field">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-field">Sujet</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input-field"
                        required
                      >
                        <option value="">Sélectionner...</option>
                        <option value="general">Question générale</option>
                        <option value="inspection">Demande d'inspection</option>
                        <option value="partnership">Devenir partenaire</option>
                        <option value="support">Support client</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label-field">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field"
                      rows={6}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nos coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-500">+212 6XX XXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-500">contact@immoverify.ma</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-500">Casablanca, Maroc</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Préférez-nous contacter sur WhatsApp pour une réponse rapide.
              </p>
              <a
                href="https://wa.me/2126XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block text-center"
              >
                Discuter sur WhatsApp
              </a>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Heures d'ouverture</h3>
              <div className="space-y-2 text-gray-600">
                <p>Lundi - Vendredi: 9h - 18h</p>
                <p>Samedi: 9h - 14h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
