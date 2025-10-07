import { Suspense } from 'react'
import ChatInterface from '@/components/ChatInterface'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  // Déterminer le nombre de questions déjà posées
  const initialQuestionCount = session ? 0 : 0 // Pour les utilisateurs non connectés, on commence à 0

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main>
        {/* Section Hero */}
        <section id="accueil" className="bg-gradient-to-r from-primary to-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Votre Divorce Simplifié avec un Avocat IA
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Obtenez des conseils juridiques personnalisés 24h/24 pour votre procédure de divorce
              </p>
              <a
                href="#chat"
                className="inline-block bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
              >
                Démarrer ma consultation
              </a>
            </div>
          </div>
        </section>

        {/* Section Chat */}
        <Suspense fallback={<div className="py-12 text-center">Chargement...</div>}>
          <ChatInterface initialQuestionCount={initialQuestionCount} />
        </Suspense>

        {/* Section À propos */}
        <section id="apropos" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              À propos de notre service
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col justify-center">
                <p className="text-gray-700 text-lg mb-4">
                  SOS Divorce est un service juridique innovant qui met la technologie au service de vos procédures de divorce.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Notre plateforme combine l&apos;expertise d&apos;avocats spécialisés avec une intelligence artificielle performante pour vous accompagner à chaque étape.
                </p>
                <p className="text-gray-700 text-lg">
                  Rapidité, confidentialité et professionnalisme garantis pour toutes vos démarches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Consultation Juridique</h3>
                <p className="text-gray-700">
                  Conseils personnalisés sur votre situation spécifique par notre avocat IA
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Rédaction de Documents</h3>
                <p className="text-gray-700">
                  Préparation de vos actes et documents juridiques nécessaires
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Accompagnement Complet</h3>
                <p className="text-gray-700">
                  Suivi de votre dossier jusqu&apos;à la finalisation de la procédure
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Avis */}
        <section id="avis" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Avis Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;Service exceptionnel ! L&apos;avocat IA m&apos;a guidé parfaitement dans mes démarches.&quot;
                </p>
                <p className="text-gray-600">- Marie L.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;Rapide, efficace et beaucoup plus abordable qu&apos;un avocat traditionnel.&quot;
                </p>
                <p className="text-gray-600">- Pierre D.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Questions Fréquentes</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Comment fonctionne l&apos;avocat IA ?
                </h3>
                <p className="text-gray-700">
                  Notre IA analyse votre situation et vous fournit des conseils juridiques personnalisés basés sur la législation française.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Est-ce confidentiel ?</h3>
                <p className="text-gray-700">
                  Absolument. Toutes vos données sont cryptées et protégées conformément au RGPD.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Contact</h2>
            <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-primary mb-4">Informations de contact</h4>
                  <p className="text-gray-700 mb-2">Email: contact@sosdivorce.fr</p>
                  <p className="text-gray-700 mb-2">Téléphone: 01 23 45 67 89</p>
                  <p className="text-gray-700">Disponible 7j/7 de 8h à 22h</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-4">Formulaire de contact</h4>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                      placeholder="Votre message"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg transition duration-300"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
