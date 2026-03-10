import Link from "next/link"
import Image from "next/image"
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
  MessageCircle,
  Wrench,
  Zap,
  Droplets,
  Eye,
  Award,
  Clock,
  TrendingUp,
  Euro,
  Calendar,
  Check,
  AlertTriangle,
  ThumbsUp,
  ChevronDown
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Immo Verify<span className="text-accent">Maroc</span></span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#pourquoi" className="text-gray-600 hover:text-primary font-medium text-sm">Pourquoi nous</Link>
              <Link href="#tarifs" className="text-gray-600 hover:text-primary font-medium text-sm">Tarifs</Link>
              <Link href="#villes" className="text-gray-600 hover:text-primary font-medium text-sm">Villes</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary font-medium text-sm">Contact</Link>
              <Link href="/login" className="text-gray-600 hover:text-primary font-medium text-sm">Connexion</Link>
              <Link href="/register" className="btn-primary text-sm px-4 py-2">Commander</Link>
            </div>
            <Link href="/register" className="md:hidden btn-primary text-sm px-3 py-2">
              Commander
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                +5000 inspections réalisées au Maroc
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Achetez votre bien au Maroc
                <span className="text-primary block mt-2">en toute confiance</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Vous souhaitez acheter un appartement, une villa ou un local commercial ? 
                Ne prenez pas de risques inutiles. Nos ingénieurs certifiés inspectent 
                votre futur bien et vous livrent un rapport complet en 48h.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/register" className="btn-primary inline-flex items-center justify-center gap-2 text-base px-6 py-3">
                  Réserver une inspection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#comment-ca-marche" className="btn-outline inline-flex items-center justify-center gap-2 text-base px-6 py-3">
                  Comment ça marche
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5000+ clients satisfaits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold text-gray-900">4.9/5</span>
                  <span className="text-gray-500 text-sm">note moyenne</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Inspection complète</h3>
                      <p className="text-gray-600">Structure, électricité, plomberie, humidité - tout est vérifié</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <UserCheck className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Ingénieurs certifiés</h3>
                      <p className="text-gray-600"> minimum 5 ans d'expérience dans le bâtiment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <Clock className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Rapport en 48h</h3>
                      <p className="text-gray-600">Recevez votre rapport détaillé rapidement</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">À partir de</p>
                        <p className="text-3xl font-bold text-primary">1 200 MAD</p>
                      </div>
                      <Link href="/register" className="btn-primary">
                        Commander
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5 000+", label: "Inspections réalisées" },
              { value: "14", label: "Villes au Maroc" },
              { value: "48h", label: "Délai de livraison" },
              { value: "98%", label: "Clients satisfaits" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-primary-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="pourquoi" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi faire inspecter votre bien ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              L'achat immobilier est le plus gros investissement de votre vie. 
              Ne laissez rien au hasard.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Évitez les mauvaises surprises",
                desc: "80% des biens vendus au Maroc présentent des défauts cachés. Notre inspection révèle tout.",
                color: "bg-red-50 text-red-600"
              },
              {
                icon: Euro,
                title: "Négociez le prix",
                desc: "Avec notre rapport détaillé, vous avez un argument solide pour négocier jusqu'à 15% du prix.",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: Shield,
                title: "Sécurisez votre investissement",
                desc: "Avoidez les frais de réparation imprévus qui peuvent représenter des centaines de milliers de dirhams.",
                color: "bg-blue-50 text-blue-600"
              }
            ].map((item, idx) => (
              <div key={idx} className="card text-center p-8">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inspected */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Que comprend l inspection ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une analyse complète de votre bien en 5 points clés
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: Home, title: "Structure", desc: "Murs, toit, fondations, facade" },
              { icon: Zap, title: "Électricité", desc: "Tableau, prises, mise à la terre" },
              { icon: Droplets, title: "Humidité", desc: "Infiltrations, ventilation" },
              { icon: Wrench, title: "Plomberie", desc: "Canalisations, robinetterie" },
              { icon: ClipboardCheck, title: "Général", desc: "État global, diagnostics" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="comment-ca-marche" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple en 4 étapes
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Commandez", desc: "Choisissez votre formule et réservez en ligne" },
              { step: "02", title: "Planifiez", desc: "Sélectionnez la date et l'heure qui vous conviennent" },
              { step: "03", title: "Inspection", desc: "Nos ingénieurs réalisent l'expertise sur place" },
              { step: "04", title: "Recevez", desc: "Votre rapport détaillé avec photos et recommandations" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos formules d inspection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des formules transparentes et adaptées à tous vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Essentiel",
                price: 1200,
                desc: "Pour les appartements",
                color: "gray",
                features: [
                  "Inspection structurelle",
                  "Électricité & plomberie",
                  "Rapport photo",
                  "Délai 48h",
                  "Support WhatsApp"
                ]
              },
              {
                name: "Standard",
                price: 2500,
                desc: "Pour les maisons & villas",
                color: "primary",
                popular: true,
                features: [
                  "Tout compris Essentiel",
                  "Humidité & infiltrations",
                  "Estimation valeur marché",
                  "Estimation travaux",
                  "Vidéo d'inspection",
                  "Recommandation détaillée"
                ]
              },
              {
                name: "Premium",
                price: 5000,
                desc: "Pour les biens de prestige",
                color: "accent",
                features: [
                  "Tout compris Standard",
                  "Analyse juridique sommaire",
                  "Rapport PDF premium",
                  "Suivi post-inspection",
                  "Garantie satisfaction",
                  "Consultation vidéo 30min"
                ]
              }
            ].map((plan, idx) => (
              <div key={idx} className={`card relative ${plan.popular ? 'ring-2 ring-primary scale-105 shadow-xl' : 'shadow-md'}`}>
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500"> MAD</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/register" 
                  className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-primary text-white hover:bg-primary-600' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Commander
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section id="villes" className="py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nous intervenons dans tout le Maroc
            </h2>
            <p className="text-xl text-primary-200">
              Un réseau d inspecteurs certifiés dans les principales villes
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", 
              "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",
              "El Jadida", "Essaouira", "Nador", "Beni Mellal", "Khouribga"
            ].map((city) => (
              <span key={city} className="px-5 py-2 bg-white/10 backdrop-blur rounded-full font-medium hover:bg-white/20 transition-colors cursor-pointer">
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
              Ce que nos clients disent de nous
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie M.",
                role: "Propriétaire à Casablanca",
                text: "L'inspecteur a détecté des problèmes d'humidité que je n'avais pas vus. Cela m'a permis de négocier 150 000 MAD sur le prix. Service indispensable !",
                rating: 5
              },
              {
                name: "Mohammed R.",
                role: "Investisseur immobilier",
                text: "Je fais inspecter tous mes biens avant achat. Immo Verify m'a déjà évité plusieurs mauvaise affaires. Le rapport est très professionnel.",
                rating: 5
              },
              {
                name: "Fatima E.",
                role: "Première acquisition",
                text: "Merci pour cette tranquillité ! L'équipe est réactive et le rapport facile à comprendre. Je recommande à tous les primo-accédants.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                a: "Une inspection complète prend entre 1h et 3h selon la taille et l'état du bien. Nous prenons le temps de tout vérifier soigneusement."
              },
              {
                q: "Quand reçoit-on le rapport ?",
                a: "Le rapport vous est envoyé par email sous 48h maximum après l'inspection. Vous pouvez aussi le télécharger depuis votre espace client."
              },
              {
                q: "Les inspecteurs sont-ils vraiment certifiés ?",
                a: "Oui, tous nos inspecteurs sont des ingénieurs graduated avec une expérience minimale de 5 ans dans le bâtiment et le BTP."
              },
              {
                q: "Puis-je annuler une inspection ?",
                a: "Vous pouvez annuler gratuitement jusqu'à 24h avant la date prévue. Au-delà, le montant n'est pas remboursable."
              },
              {
                q: "Que comprend exactement l'inspection ?",
                a: "L'inspection couvre la structure, l'électricité, la plomberie, l'humidité et selon la formule choisie, d'autres éléments spécifiques comme la valeur marché ou les estimations de travaux."
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl p-6 cursor-pointer group">
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
                </summary>
                <p className="text-gray-600 mt-4 pt-4 border-t">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à sécuriser votre achat ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Ne prenez pas de risques. Commandez votre inspection dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Commander une inspection
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/212661234567" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              Nous contacter sur WhatsApp
            </a>
          </div>
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
                <li><Link href="#tarifs" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="#pourquoi" className="hover:text-white">Pourquoi nous</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/login" className="hover:text-white">Connexion</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white">Confidentialité</Link></li>
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
                  WhatsApp disponible
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Immo Verify Maroc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/212661234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  )
}
