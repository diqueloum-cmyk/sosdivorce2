import { Suspense } from 'react'
import ChatInterface from '@/components/ChatInterface'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <h1 className="text-xl font-bold text-primary">sosdivorce.fr</h1>
            </div>
            
            <div className="flex space-x-8 items-center">
              <a href="#accueil" className="text-gray-700 hover:text-primary font-medium">Accueil</a>
              <a href="#apropos" className="text-gray-700 hover:text-primary font-medium">À propos</a>
              <a href="#services" className="text-gray-700 hover:text-primary font-medium">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-primary font-medium">Contact</a>
              
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    Bonjour {session.user.prenom}
                  </span>
                  <form action="/api/auth/signout" method="post">
                    <button type="submit" className="text-red-600 hover:text-red-800 font-medium">
                      Déconnexion
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <a href="/auth/signin" className="text-primary hover:text-blue-800 font-medium">
                    Connexion
                  </a>
                  <a href="/auth/signup" className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium">
                    S'inscrire
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="accueil" className="bg-gradient-to-r from-primary to-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Votre Divorce Simplifié avec un Avocat IA
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Obtenez des conseils juridiques personnalisés 24h/24 pour votre procédure de divorce
              </p>
              <div className="text-sm opacity-75">
                {session ? (
                  <p>Connecté en tant que {session.user.prenom} {session.user.nom}</p>
                ) : (
                  <p>2 questions gratuites • Connexion requise pour continuer</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-[600px]">
                <Suspense fallback={
                  <div className="h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <div className="text-gray-500">Chargement du chat...</div>
                  </div>
                }>
                  <ChatInterface />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Consultation Juridique</h3>
                <p className="text-gray-700">Conseils personnalisés sur votre situation spécifique par notre avocat IA</p>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Rédaction de Documents</h3>
                <p className="text-gray-700">Préparation de vos actes et documents juridiques nécessaires</p>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Accompagnement Complet</h3>
                <p className="text-gray-700">Suivi de votre dossier jusqu'à la finalisation de la procédure</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="apropos" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">À propos de notre service</h2>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col justify-center">
                <p className="text-gray-700 text-lg mb-4">
                  SOS Divorce est un service juridique innovant qui met la technologie au service de vos procédures de divorce.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Notre plateforme combine l'expertise d'avocats spécialisés avec une intelligence artificielle performante pour vous accompagner à chaque étape.
                </p>
                <p className="text-gray-700 text-lg">
                  Rapidité, confidentialité et professionnalisme garantis pour toutes vos démarches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
                  <div className="space-y-4">
                    <input type="text" placeholder="Votre nom" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="email" placeholder="Votre email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <textarea placeholder="Votre message" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows={4}></textarea>
                    <button className="bg-primary hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg transition duration-300">
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">sosdivorce.fr</h4>
              <p className="text-blue-100">Service juridique de divorce en ligne</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Mentions légales</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white">CGU</a></li>
                <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white">Service-public.fr</a></li>
                <li><a href="#" className="hover:text-white">CNIL</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-600 mt-8 pt-6 text-center text-blue-100">
            <p>&copy; 2024 sosdivorce.fr - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
