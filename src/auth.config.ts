import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublicPath = nextUrl.pathname === "/" || nextUrl.pathname === "/login" || nextUrl.pathname === "/register"

      if (!isLoggedIn && !isPublicPath) {
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        // Redirect authenticated users trying to access login or register to home or dashboard
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        if (token.role) {
          session.user.role = token.role as string
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
