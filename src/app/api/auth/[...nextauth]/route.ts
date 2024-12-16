import { nextAuthOptions } from "@/lib/nextAuth"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }