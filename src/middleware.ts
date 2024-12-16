import { getServerSession } from "next-auth";
import { NextRequest , NextResponse} from "next/server";
import { nextAuthOptions } from "@/lib/nextAuth";
import { decode } from "next-auth/jwt";

export default async function middleware(req : NextRequest) {
  const token = req.cookies.get('next-auth.session-token')

      const decodedToken = await decode({
      token: token?.value,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    console.log( "decodedToken", decodedToken);
    
  
  if(!token) return NextResponse.redirect(new URL('/login', req.url));
  
  return NextResponse.next();
}

export const config = {
  matcher: '/',
}
