<<<<<<< HEAD
# 🏛️ sosdivorce.fr - Service Juridique de Divorce IA

Service juridique professionnel pour vos procédures de divorce avec un avocat IA disponible 24h/24.

## ✨ Fonctionnalités

### 🤖 Chat IA avec Assistant OpenAI
- **Assistant spécialisé** : Connecté à votre assistant OpenAI (`asst_Roo0D8nWTgXAaP7TPUjE63yo`)
- **Effet machine à écrire** : Réponses affichées caractère par caractère pour un rendu naturel
- **Réponses en temps réel** : Intégration complète avec l'API OpenAI Assistants

### 🔐 Système d'authentification
- **Inscription sécurisée** : Civilité, Nom, Prénom, Téléphone, Email, Mot de passe
- **Connexion NextAuth.js** : Gestion sécurisée des sessions
- **Limite gratuite** : 2 questions pour les visiteurs non connectés
- **Mot de passe crypté** : Hachage bcrypt pour la sécurité

### 💾 Base de données complète
- **PostgreSQL + Prisma** : Modèles User, Conversation, Message
- **Sauvegarde des conversations** : Historique complet des échanges
- **Données utilisateur** : Profils complets avec informations de contact

### 📊 Back-office administrateur
- **Statistiques globales** : Nombre d'utilisateurs, conversations, messages
- **Tableau de bord** : Graphiques d'évolution mensuelle
- **Gestion utilisateurs** : Liste des utilisateurs récents
- **Monitoring conversations** : Suivi des échanges et de l'activité

## 🛠️ Technologies utilisées

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse
- **TailwindCSS** : Design responsive et moderne
- **Prisma** : ORM pour la base de données
- **PostgreSQL** : Base de données relationnelle
- **NextAuth.js** : Authentification sécurisée
- **OpenAI API** : Intégration Assistant IA
- **Vercel** : Déploiement et hébergement
- **Recharts** : Graphiques pour le back-office

## 🚀 Architecture du projet

```
sosdivorce-nextjs/
├── app/                    # App Router Next.js
│   ├── api/               # Routes API
│   │   ├── auth/          # Authentification
│   │   └── chat/          # API Chat OpenAI
│   ├── admin/             # Back-office
│   └── auth/              # Pages de connexion
├── components/            # Composants React
│   ├── ChatInterface.tsx  # Interface de chat avec effet machine à écrire
│   ├── AdminDashboard.tsx # Tableau de bord administrateur
│   └── Providers.tsx      # Providers React (NextAuth)
├── lib/                   # Utilitaires et configuration
│   ├── prisma.ts          # Client Prisma
│   ├── auth.ts            # Configuration NextAuth
│   └── openai.ts          # Configuration OpenAI
├── prisma/                # Schéma de base de données
│   └── schema.prisma      # Modèles User, Conversation, Message
└── types/                 # Types TypeScript
    └── next-auth.d.ts     # Extension des types NextAuth
```

## 📋 Prérequis

- Node.js 18+ 
- Compte OpenAI avec clé API
- Assistant OpenAI configuré (`asst_Roo0D8nWTgXAaP7TPUjE63yo`)
- Base de données PostgreSQL (Vercel Postgres recommandé)

## 🎯 Installation et déploiement

### 1. Configuration locale

```bash
# Cloner le projet
git clone <votre-repo>
cd sosdivorce-nextjs

# Installer les dépendances
npm install

# Configurer l'environnement
cp env.example .env.local
# Éditer .env.local avec vos clés API
```

### 2. Variables d'environnement requises

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-clé-secrète"
OPENAI_API_KEY="votre-clé-openai"
ASSISTANT_ID="asst_Roo0D8nWTgXAaP7TPUjE63yo"
ADMIN_EMAIL="admin@sosdivorce.fr"
```

### 3. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma
npx prisma db push
```

### 4. Démarrage en développement

```bash
npm run dev
```

### 5. Déploiement sur Vercel

Voir le guide détaillé dans `DEPLOYMENT.md`

## 🎨 Interface utilisateur

### Page d'accueil
- **Hero section** : Présentation du service
- **Chat intégré** : Interface principale avec effet machine à écrire
- **Sections informatives** : À propos, services, contact

### Chat intelligent
- **Messages en temps réel** : Affichage fluide des échanges
- **Effet machine à écrire** : Simulation d'écriture naturelle
- **Indicateurs visuels** : Statut de connexion, limites d'usage
- **Responsive design** : Optimisé mobile et desktop

### Back-office
- **Tableau de bord** : Métriques en temps réel
- **Graphiques** : Évolution des utilisateurs et conversations
- **Gestion des données** : Consultation des utilisateurs et échanges

## 🔒 Sécurité

- **Authentification robuste** : NextAuth.js avec hachage bcrypt
- **Validation des données** : Zod pour la validation des entrées
- **Protection des routes** : Middleware d'authentification
- **Variables d'environnement** : Clés API sécurisées
- **RGPD compliant** : Gestion des données personnelles

## 📈 Monitoring et analytics

- **Statistiques temps réel** : Utilisateurs, conversations, messages
- **Évolution mensuelle** : Graphiques de croissance
- **Suivi des performances** : Métriques d'utilisation
- **Logs d'activité** : Historique des interactions

## 🌐 Déploiement en production

Le projet est optimisé pour Vercel avec :
- **Edge Functions** : Performance optimale
- **PostgreSQL intégré** : Base de données managée
- **CDN global** : Diffusion rapide mondiale
- **SSL automatique** : Sécurité HTTPS
- **Domaines personnalisés** : Configuration sosdivorce.fr

## 📞 Support et maintenance

- **Documentation complète** : Guides d'installation et déploiement
- **Code commenté** : Explication des fonctionnalités
- **Structure modulaire** : Facilité de maintenance
- **Tests intégrés** : Validation des fonctionnalités

---

**🎉 Votre service juridique IA est prêt à révolutionner l'accompagnement au divorce !**
=======
# sosdivorce.fr

Service juridique professionnel pour vos procédures de divorce. Avocat IA disponible 24h/24.

## 🚀 Fonctionnalités

- **Avocat IA** : Chat intelligent pour répondre à vos questions juridiques
- **Authentification** : Système de connexion et d'inscription
- **Limite gratuite** : 2 questions gratuites pour les visiteurs non connectés
- **Interface moderne** : Design responsive avec Tailwind CSS
- **Sections complètes** : Accueil, À propos, Services, Avis, FAQ, Contact

## 📋 Technologies utilisées

- HTML5
- JavaScript (Vanilla)
- Tailwind CSS (via CDN)
- LocalStorage pour la persistance des données

## 🎯 Démarrage

1. Clonez ce dépôt
2. Ouvrez `index.html` dans votre navigateur
3. C'est tout ! Aucune installation requise.

## 📁 Structure du projet

```
sosdivorce2/
├── index.html          # Page principale
├── js/
│   └── main.js        # Logique JavaScript
└── README.md          # Ce fichier
```

## 🔒 Sécurité

⚠️ **Note importante** : Ce projet utilise LocalStorage pour stocker les données utilisateurs. Pour une application en production, il est recommandé d'utiliser un backend sécurisé avec une vraie base de données et un système d'authentification robuste.

## 📝 Licence

Tous droits réservés © 2024 sosdivorce.fr

>>>>>>> a34d4d48435213dc4f2018f38b5858c2b61837f1
