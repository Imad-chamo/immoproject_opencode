import Link from "next/link"
import { Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function TarifsPage() {
  const formulas = [
    {
      name: "Essentiel",
      price: 1200,
      desc: "Pour les appartements et petits biens",
      features: [
        "Inspection structurelle",
        "Électricité & plomberie",
        "Rapport photo",
        "Délai 48h",
        "Support WhatsApp",
      ],
      popular: false,
    },
    {
      name: "Standard",
      price: 2500,
      desc: "Pour les maisons et villas",
      features: [
        "Tout compris Essentiel",
        "Humidité & infiltrations",
        "Estimation valeur marché",
        "Estimation travaux",
        "Vidéo d'inspection",
        "Recommandation détaillée",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: 5000,
      desc: "Pour les biens de luxe",
      features: [
        "Tout compris Standard",
        "Analyse juridique",
        "Rapport PDF premium",
        "Suivi post-inspection",
        "Garantie satisfaction",
        "Consultation vidéo 30min",
      ],
      popular: false,
    },
  ]

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
            <div className="flex items-center space-x-6">
              <Link href="/a-propos" className="text-gray-600 hover:text-primary font-medium">À propos</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary font-medium">Contact</Link>
              <Link href="/login" className="text-gray-600 hover:text-primary font-medium">Connexion</Link>
              <Link href="/register" className="btn-primary">Commander</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos tarifs d inspection</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des formules transparentes et adaptées à tous vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {formulas.map((plan) => (
            <div key={plan.name} className={`card relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                  Populaire
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-gray-500"> MAD</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                  plan.popular ? 'btn-accent' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Commander
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-primary/5 rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vous êtes un professionnel ?</h2>
          <p className="text-gray-600 mb-6">
            Nous proposons des tarifs préférentiels pour les agences immobilières, promoteurs et investisseurs institutionnels.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Demander un devis <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  )
}
