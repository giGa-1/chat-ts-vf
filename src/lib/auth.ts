import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GoogleProvider from 'next-auth/providers/google'
import { redirect } from "next/navigation";

const getGoogleCredentials = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET; 
    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
      }
    
      if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
      }
    

    return {clientId, clientSecret}
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: { 
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        })
    ],
    callbacks: {
        
        async jwt ({token, user}) {
            const dbUser = (await db.get(`user:${token.id}`)) as User | null

            if(!dbUser) {token.id = user!.id; return token}

            return {
                id: dbUser.id,
                email: dbUser.email,
                name: dbUser.name,
                picture: dbUser.image
            }   
        },
        async session ({session, token}) {
            if (token) {
                
                session.user.id = token.id;
                session.user.image = token.picture;
                session.user.name = token.name;
                session.user.email = token.email;
            } 

            return session
        },
        redirect() {
            return '/dashboard'
          },
    }
}