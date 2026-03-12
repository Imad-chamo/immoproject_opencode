import Link from "next/link"
import { Shield, Users, Award, MapPin, MessageCircle } from "lucide-react"

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">DariCheck</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/tarifs" className="text-gray-600 hover:text-primary font-medium">Tarifs</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary font-medium">Contact</Link>
              <Link href="/login" className="text-gray-600 hover:text-primary font-medium">Connexion</Link>
              <Link href="/register" className="btn-primary">Commander</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Votre partenaire de confiance pour l inspection immobilière au Maroc
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              DariCheck est la première plateforme indépendante d'inspection immobilière au Maroc. 
              Nous aidons les acheteurs à prendre des décisions éclairées grâce à des rapports détaillés et objectifs.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-gray-500">Inspections</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">14</p>
                <p className="text-sm text-gray-500">Villes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">4.9/5</p>
                <p className="text-sm text-gray-500">Note</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Notre mission</h3>
            <p className="text-primary-100 mb-6">
              Permettre à chaque acheteur immobilier au Maroc d'acheter en toute confiance, 
              avec une connaissance complète de l'état du bien.
            </p>
            <h3 className="text-2xl font-bold mb-4">Nos valeurs</h3>
            <ul className="space-y-2 text-primary-100">
              <li>✓ Indépendance et objectivité</li>
              <li>✓ Professionnalisme rigueur</li>
              <li>✓ Transparence totale</li>
              <li>✓ Satisfaction client</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Équipe qualifiée</h3>
            <p className="text-gray-600">
              Nos inspecteurs sont des ingénieurs certifiés avec une expérience minimale de 5 ans dans le bâtiment.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Certification</h3>
            <p className="text-gray-600">
              Tous nos rapports sont certifiés et conformes aux standards internationaux d'inspection.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Couverture nationale</h3>
            <p className="text-gray-600">
              Nous intervenons dans toutes les grandes villes du Maroc avec un réseau d'inspecteurs locaux.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'aide ?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Notre équipe est disponible pour répondre à toutes vos questions
          </p>
          <Link href="/contact" className="btn-accent inline-flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Nous contacter
          </Link>
        </div>
      </main>
    </div>
  )
}
