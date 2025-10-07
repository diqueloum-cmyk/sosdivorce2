import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  // Statistiques globales
  const totalUsers = await prisma.user.count()
  const totalConversations = await prisma.conversation.count()
  const totalMessages = await prisma.message.count({
    where: { role: 'user' }
  })

  // Utilisateurs avec leurs statistiques
  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const userStats = users.map(user => ({
    id: user.id,
    civilite: user.civilite,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    createdAt: user.createdAt,
    conversationsCount: user.conversations.length,
    questionsCount: user.conversations.reduce(
      (acc, conv) => acc + conv.messages.filter(m => m.role === 'user').length,
      0
    )
  }))

  // Messages par jour (derniers 7 jours)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const recentMessages = await prisma.message.findMany({
    where: {
      role: 'user',
      createdAt: {
        gte: sevenDaysAgo
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const messagesByDay = recentMessages.reduce((acc: any, msg) => {
    const date = msg.createdAt.toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(messagesByDay).map(([date, count]) => ({
    date,
    questions: count as number
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Back-office Admin</h1>
              <p className="text-blue-100 mt-1">sosdivorce.fr</p>
            </div>
            <Link
              href="/"
              className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AdminDashboard
          totalUsers={totalUsers}
          totalConversations={totalConversations}
          totalMessages={totalMessages}
          userStats={userStats}
          chartData={chartData}
        />
      </main>
    </div>
  )
}
