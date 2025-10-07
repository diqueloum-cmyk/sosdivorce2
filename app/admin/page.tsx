import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Vérifier si l'utilisateur est admin
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  // Récupérer les statistiques
  const [
    totalUsers,
    totalConversations,
    totalMessages,
    usersThisMonth,
    conversationsThisMonth,
    recentUsers,
    recentConversations
  ] = await Promise.all([
    prisma.user.count(),
    prisma.conversation.count(),
    prisma.message.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.conversation.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        createdAt: true
      }
    }),
    prisma.conversation.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            nom: true,
            prenom: true,
            email: true
          }
        },
        messages: {
          select: {
            id: true
          }
        }
      }
    })
  ])

  const stats = {
    totalUsers,
    totalConversations,
    totalMessages,
    usersThisMonth,
    conversationsThisMonth
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard 
        stats={stats}
        recentUsers={recentUsers}
        recentConversations={recentConversations}
      />
    </div>
  )
}
