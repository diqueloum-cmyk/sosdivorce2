# Guide de Déploiement - sosdivorce.fr

## 🚀 Déploiement sur Vercel

### 1. Préparation du projet

```bash
# Aller dans le répertoire du projet
cd sosdivorce-nextjs

# Copier le fichier d'environnement
cp env.example .env.local

# Éditer les variables d'environnement
nano .env.local
```

### 2. Configuration des variables d'environnement

Éditez le fichier `.env.local` avec vos vraies valeurs :

```env
# Base de données PostgreSQL (Vercel Postgres)
DATABASE_URL="postgresql://username:password@hostname:port/database"

# NextAuth.js
NEXTAUTH_URL="https://votre-domaine.vercel.app"
NEXTAUTH_SECRET="votre-clé-secrète-très-longue-et-aléatoire"

# OpenAI
OPENAI_API_KEY="votre-clé-api-openai"
ASSISTANT_ID="asst_Roo0D8nWTgXAaP7TPUjE63yo"

# Admin
ADMIN_EMAIL="votre-email-admin@sosdivorce.fr"
```

### 3. Installation des dépendances

```bash
# Installer les dépendances (si npm fonctionne)
npm install

# OU utiliser yarn si npm ne fonctionne pas
yarn install
```

### 4. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations (après avoir configuré DATABASE_URL)
npx prisma db push
```

### 5. Déploiement sur Vercel

#### Option A : Via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez le dépôt `sosdivorce2`
4. Configurez les variables d'environnement dans l'interface Vercel
5. Déployez

#### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Configurer les variables d'environnement
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add OPENAI_API_KEY
vercel env add ASSISTANT_ID
vercel env add ADMIN_EMAIL
```

### 6. Configuration Vercel Postgres

1. Dans le dashboard Vercel, allez dans Storage
2. Créez une nouvelle base de données Postgres
3. Copiez l'URL de connexion vers `DATABASE_URL`
4. Exécutez les migrations :

```bash
npx prisma db push
```

### 7. Configuration du domaine personnalisé

1. Dans Vercel, allez dans Domains
2. Ajoutez `sosdivorce.fr`
3. Configurez les DNS selon les instructions Vercel

## 📊 Accès au back-office

Une fois déployé, accédez au back-office via :
`https://votre-domaine.com/admin`

L'accès est réservé à l'email défini dans `ADMIN_EMAIL`.

## 🔧 Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start

# Prisma Studio (interface graphique pour la DB)
npx prisma studio
```

## 🐛 Dépannage

### Erreur de permissions npm
```bash
# Nettoyer le cache npm
npm cache clean --force

# OU utiliser yarn
yarn install
```

### Erreur de base de données
- Vérifiez que `DATABASE_URL` est correct
- Assurez-vous que Vercel Postgres est configuré
- Exécutez `npx prisma db push` après configuration

### Erreur OpenAI
- Vérifiez que `OPENAI_API_KEY` est valide
- Vérifiez que `ASSISTANT_ID` correspond à votre assistant

## 📝 Notes importantes

- Le site utilise Prisma avec PostgreSQL
- L'authentification est gérée par NextAuth.js
- L'effet machine à écrire est implémenté côté client
- La limite de 2 questions est appliquée aux utilisateurs non connectés
- Toutes les données sont sauvegardées en base
