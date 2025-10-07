'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SD</span>
            </div>
            <h1 className="text-xl font-bold text-primary">sosdivorce.fr</h1>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => handleScrollTo('accueil')} className="text-gray-700 hover:text-primary font-medium">
              Accueil
            </button>
            <button onClick={() => handleScrollTo('apropos')} className="text-gray-700 hover:text-primary font-medium">
              À propos
            </button>
            <button onClick={() => handleScrollTo('services')} className="text-gray-700 hover:text-primary font-medium">
              Services
            </button>
            <button onClick={() => handleScrollTo('avis')} className="text-gray-700 hover:text-primary font-medium">
              Avis
            </button>
            <button onClick={() => handleScrollTo('faq')} className="text-gray-700 hover:text-primary font-medium">
              FAQ
            </button>
            <button onClick={() => handleScrollTo('contact')} className="text-gray-700 hover:text-primary font-medium">
              Contact
            </button>
            
            {!session ? (
              <div className="flex space-x-4">
                <Link href="/auth/signin" className="text-primary hover:text-blue-800 font-medium">
                  Connexion
                </Link>
                <Link href="/auth/signup" className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium">
                  S&apos;inscrire
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  {session.user?.prenom} {session.user?.nom}
                </span>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-primary hover:text-blue-800 font-medium">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-secondary hover:text-red-800 font-medium"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
          
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

