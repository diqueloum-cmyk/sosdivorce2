import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      civilite: string
      nom: string
      prenom: string
      telephone: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    civilite: string
    nom: string
    prenom: string
    telephone: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    civilite: string
    nom: string
    prenom: string
    telephone: string
  }
}
