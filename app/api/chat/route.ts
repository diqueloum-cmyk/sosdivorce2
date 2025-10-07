import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { openai, ASSISTANT_ID } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { message, conversationId } = chatSchema.parse(body)

    // Vérifier la limite pour les utilisateurs non connectés
    if (!session) {
      const guestConversationId = conversationId || 'guest-' + Date.now()
      const conversation = await prisma.conversation.findUnique({
        where: { id: guestConversationId },
        include: { messages: true }
      })

      if (conversation && conversation.messages.filter(m => m.role === 'user').length >= 2) {
        return NextResponse.json(
          { error: 'Limite de 2 questions gratuites atteinte. Veuillez vous connecter.' },
          { status: 403 }
        )
      }
    }

    // Créer ou récupérer la conversation
    let currentConversationId = conversationId
    if (!currentConversationId) {
      const conversation = await prisma.conversation.create({
        data: {
          userId: session?.user?.id,
          sessionId: session?.user?.id || 'guest-' + Date.now()
        }
      })
      currentConversationId = conversation.id
    }

    // Sauvegarder le message utilisateur
    await prisma.message.create({
      data: {
        conversationId: currentConversationId,
        content: message,
        role: 'user'
      }
    })

    // Créer ou récupérer le thread OpenAI
    const threadId = await getOrCreateThread(currentConversationId)
    
    // Ajouter le message au thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message
    })

    // Lancer l'assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID
    })

    // Attendre la réponse
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    }

    if (runStatus.status === 'completed') {
      // Récupérer la réponse
      const messages = await openai.beta.threads.messages.list(threadId)
      const assistantMessage = messages.data[0]
      
      if (assistantMessage && assistantMessage.content[0].type === 'text') {
        const responseContent = assistantMessage.content[0].text.value

        // Sauvegarder la réponse de l'assistant
        await prisma.message.create({
          data: {
            conversationId: currentConversationId,
            content: responseContent,
            role: 'assistant'
          }
        })

        return NextResponse.json({
          response: responseContent
        })
      }
    }

    return NextResponse.json(
      { error: 'Erreur lors de la génération de la réponse' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Erreur API chat:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

async function getOrCreateThread(conversationId: string): Promise<string> {
  // En production, vous devriez stocker le threadId dans la base de données
  // Pour simplifier, on utilise une approche basée sur l'ID de conversation
  try {
    // Vérifier si un thread existe déjà pour cette conversation
    // Ici, on crée un nouveau thread à chaque fois pour simplifier
    const thread = await openai.beta.threads.create()
    return thread.id
  } catch (error) {
    console.error('Erreur création thread:', error)
    throw error
  }
}
