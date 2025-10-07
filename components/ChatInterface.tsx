'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  initialQuestionCount: number
}

export default function ChatInterface({ initialQuestionCount }: ChatInterfaceProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(initialQuestionCount)
  const [showAuthRequired, setShowAuthRequired] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const typewriterEffect = async (text: string, callback: (char: string) => void) => {
    for (let i = 0; i < text.length; i++) {
      callback(text[i])
      await new Promise(resolve => setTimeout(resolve, 20))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Vérifier la limite de questions pour les non-connectés
    if (!session && questionCount >= 2) {
      setShowAuthRequired(true)
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    // Ajouter un message assistant vide qui sera rempli progressivement
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de l\'envoi du message')
      }

      const data = await response.json()
      
      // Effet machine à écrire
      let currentText = ''
      await typewriterEffect(data.response, (char) => {
        currentText += char
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: currentText
          }
          return newMessages
        })
      })

      // Incrémenter le compteur de questions
      setQuestionCount(prev => prev + 1)
    } catch (error) {
      console.error('Erreur:', error)
      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: 'Désolé, une erreur est survenue. Veuillez réessayer.'
        }
        return newMessages
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12 bg-gray-50" id="chat">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Avocat du divorce IA</h3>
          <div className="space-y-4">
            {/* Message de bienvenue */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700">
                Bonjour, je suis votre assistant juridique IA. Comment puis-je vous aider dans votre procédure de divorce aujourd&apos;hui ?
              </p>
            </div>
            
            {/* Messages du chat */}
            <div className="space-y-4 min-h-[200px] max-h-[500px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-gray-100 ml-8'
                      : 'bg-blue-50 mr-8'
                  }`}
                >
                  <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Zone d'input */}
            {!showAuthRequired ? (
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question juridique..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi...' : 'Envoyer'}
                </button>
              </form>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800 mb-4">
                  Vous avez atteint la limite de 2 questions gratuites. Veuillez vous connecter ou créer un compte pour continuer.
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={() => router.push('/auth/signin')}
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => router.push('/auth/signup')}
                    className="bg-secondary hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    S&apos;inscrire
                  </button>
                </div>
              </div>
            )}
            
            {/* Indicateur de questions restantes pour non-connectés */}
            {!session && !showAuthRequired && (
              <p className="text-sm text-gray-500 text-center">
                Questions gratuites restantes : {2 - questionCount}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
