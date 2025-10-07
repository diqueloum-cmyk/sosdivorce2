'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react'

interface UserStat {
  id: string
  civilite: string
  nom: string
  prenom: string
  email: string
  telephone: string
  createdAt: Date
  conversationsCount: number
  questionsCount: number
}

interface ChartDataPoint {
  date: string
  questions: number
}

interface AdminDashboardProps {
  totalUsers: number
  totalConversations: number
  totalMessages: number
  userStats: UserStat[]
  chartData: ChartDataPoint[]
}

export default function AdminDashboard({
  totalUsers,
  totalConversations,
  totalMessages,
  userStats,
  chartData
}: AdminDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Statistiques globales */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">Statistiques Globales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Utilisateurs</p>
                <p className="text-3xl font-bold text-primary mt-2">{totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Conversations</p>
                <p className="text-3xl font-bold text-primary mt-2">{totalConversations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Questions posées</p>
                <p className="text-3xl font-bold text-primary mt-2">{totalMessages}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique des questions */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Questions des 7 derniers jours
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="questions" fill="#1e3a8a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Utilisateurs et leurs statistiques</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userStats.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.civilite} {user.prenom} {user.nom}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.telephone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.conversationsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.questionsCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {userStats.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun utilisateur enregistré pour le moment
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
