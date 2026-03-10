import Link from "next/link"
import { 
  Shield, 
  Home, 
  CheckCircle, 
  MapPin, 
  Star, 
  Phone, 
  ArrowRight,
  ClipboardCheck,
  UserCheck,
  FileText,
  CreditCard,
  MessageCircle,
  Building2,
  Wrench,
  Users
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Immo Verify<span className="text-accent">Maroc</span></span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/tarifs" className="text-gray-600 hover:text-primary font-medium">Tarifs</Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-primary font-medium">À propos</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary font-medium">Contact</Link>
              <Link href="/login" className="text-gray-600 hover:text-primary font-medium">Connexion</Link>
              <Link href="/register" className="btn-primary">Commander</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Achetez au Maroc
                <span className="text-primary block">les yeux ouverts</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Inspection professionnelle de propriétés immobilières par des ingénieurs certifiés. 
                Protégez votre investissement avec un rapport détaillé en 48h.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                  Commander une inspection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#how-it-works" className="btn-outline inline-flex items-center justify-center gap-2 text-lg">
                  Comment ça marche
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-500">note clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-semibold">5000+</span>
                  <span className="text-gray-500">inspections</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-100 rounded-3xl rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Structure vérifiée</h3>
                        <p className="text-gray-600">Fondations, murs, toit</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Installations contrôlées</h3>
                        <p className="text-gray-600">Électricité, plomberie</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Home className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Rapport détaillé</h3>
                        <p className="text-gray-600">Photos, recommandations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple en 5 étapes pour votre tranquillité d'esprit
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: ClipboardCheck, title: "1. Commandez", desc: "Choisissez votre formule et reservez" },
              { icon: MapPin, title: "2. Planifiez", desc: "Fixez la date d'inspection" },
              { icon: UserCheck, title: "3. Inspection", desc: "Un ingénieur certifié controle" },
              { icon: FileText, title: "4. Rapport", desc: "Recevez votre rapport détaillé" },
              { icon: Shield, title: "5. Décidez", desc: "Achetez en confiance" },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos formules d inspection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des formules adaptées à tous les types de propriétés
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Essentiel",
                price: 1200,
                desc: "Pour les appartements et petits biens",
                features: [
                  "Inspection structurelle",
                  "Électricité & plomberie",
                  "Rapport photo",
                  "Délai 48h",
                  "Support WhatsApp"
                ],
                popular: false
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
                  "Recommandation détaillée"
                ],
                popular: true
              },
              {
                name: "Premium",
                price: 5000,
                desc: "Pour les biens de luxe",
                features: [
                  "Tout compris Standard",
                  "Inspection complète",
                  "Analyse juridique",
                  "Rapport PDF premium",
                  "Suivi post-inspection",
                  "Garantie satisfaction"
                ],
                popular: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`card relative ${plan.popular ? 'ring-2 ring-accent scale-105' : ''}`}>
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
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                  plan.popular ? 'btn-accent' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Commander
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 px-4 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Villes couvertes
            </h2>
            <p className="text-xl text-gray-600">
              Nous intervenons dans les principales villes du Maroc
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", 
              "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",
              "El Jadida", "Essaouira", "Nador", "Beni Mellal"
            ].map((city) => (
              <span key={city} className="px-4 py-2 bg-white rounded-full text-gray-700 font-medium shadow-sm">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Témoignages clients
            </h2>
            <p className="text-xl text-gray-600">
              Ce que nos clients disent de nous
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie M.",
                role: "Propriétaire à Casablanca",
                text: "Excellent service ! L'inspecteur a détecté des problèmes d'humidité que je n'avais pas vus. Cela m'a permis de négocier le prix.",
                rating: 5
              },
              {
                name: "Mohammed R.",
                role: "Investisseur immobilier",
                text: "Immo Verify m'a sauvé d'une mauvaise affaire. Le rapport était très détaillé et professionnel. Je recommande.",
                rating: 5
              },
              {
                name: "Fatima E.",
                role: "Première acquisition",
                text: "Très satisfaite de l'expérience. L'équipe est réactived et le rapport facile à comprendre. Merci pour cette tranquillité.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Combien de temps prend une inspection ?",
                a: "Une inspection complète prend généralement entre 1h et 3h selon la taille et l'état du bien."
              },
              {
                q: "Quand reçoit-on le rapport ?",
                a: "Le rapport vous est envoyé par email et disponible sur votre dashboard dans un délai de 24 à 48h après l'inspection."
              },
              {
                q: "Les inspecteurs sont-ils certifiés ?",
                a: "Oui, tous nos inspecteurs sont des ingénieurs certifiés avec une expérience minimale de 5 ans dans le bâtiment."
              },
              {
                q: "Puis-je annuler une inspection ?",
                a: "Vous pouvez annuler jusqu'à 24h avant la date prévue sans frais. Au-delà, le montant n'est pas remboursable."
              },
              {
                q: "Que comprend exactement l'inspection ?",
                a: "L'inspection couvre la structure, l'électricité, la plomberie, l'humidité, et selon la formule choisie, d'autres éléments spécifiques."
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à sécuriser votre investissement ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
           Commandez votre inspection maintenant et achetez en toute confiance
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Commander une inspection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Immo Verify<span className="text-accent">Maroc</span></span>
              </Link>
              <p className="text-sm">
                Votre partenaire de confiance pour l'inspection immobilière au Maroc.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tarifs" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="/a-propos" className="hover:text-white">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/login" className="hover:text-white">Connexion</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white">Politique de confidentialité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +212 6XX XXXXXX
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; 2024 Immo Verify Maroc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2126XXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  )
}
