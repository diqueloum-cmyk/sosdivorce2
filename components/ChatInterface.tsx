'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Send, User, Bot } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatInterfaceProps {
  className?: string
}

export default function ChatInterface({ className = '' }: ChatInterfaceProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bonjour, je suis votre assistant juridique IA. Comment puis-je vous aider dans votre procédure de divorce aujourd\'hui ?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [typingMessage, setTypingMessage] = useState<string>('')

  // Compter les questions de l'utilisateur (pour la limite)
  const userMessageCount = messages.filter(m => m.role === 'user').length
  const isLimitReached = !session && userMessageCount >= 2

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typingMessage])

  // Effet machine à écrire
  const typeMessage = (text: string, onComplete: () => void) => {
    let index = 0
    setTypingMessage('')
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        onComplete()
      }
    }, 30) // Vitesse de frappe : 30ms par caractère
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading || isLimitReached) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationId: conversationId
        }),
      })

      const data = await response.json()

      if (response.status === 403) {
        // Limite atteinte
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: 'Vous avez atteint la limite de 2 questions gratuites. Veuillez vous connecter ou créer un compte pour continuer.',
          role: 'assistant',
          timestamp: new Date()
        }])
        return
      }

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message')
      }

      if (data.conversationId) {
        setConversationId(data.conversationId)
      }

      // Ajouter la réponse avec effet machine à écrire
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      }

      typeMessage(data.message, () => {
        setMessages(prev => [...prev, assistantMessage])
        setTypingMessage('')
      })

    } catch (error) {
      console.error('Erreur:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        role: 'assistant',
        timestamp: new Date()
      }])
      setTypingMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    signIn()
  }

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-primary text-white rounded-t-lg">
        <h3 className="text-xl font-bold">Avocat IA - Divorce</h3>
        {session && (
          <p className="text-sm opacity-90">
            Connecté en tant que {session.user.prenom} {session.user.nom}
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.role === 'user'
                      ? 'text-blue-100'
                      : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Message en cours de frappe */}
        {typingMessage && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                <p className="whitespace-pre-wrap">{typingMessage}</p>
                <div className="inline-block w-2 h-4 bg-gray-600 animate-pulse ml-1"></div>
              </div>
            </div>
          </div>
        )}

        {/* Indicateur de chargement */}
        {isLoading && !typingMessage && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {isLimitReached ? (
        <div className="p-4 border-t border-gray-200 bg-yellow-50">
          <div className="text-center">
            <p className="text-yellow-800 mb-4">
              Vous avez atteint la limite de 2 questions gratuites.
            </p>
            <button
              onClick={handleSignIn}
              className="bg-primary hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
            >
              Se connecter pour continuer
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question juridique..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
