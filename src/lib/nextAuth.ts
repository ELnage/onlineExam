import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);

        if (credentials) {
          const response = await fetch("https://exam.elevateegy.com/api/v1/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          console.log("nagy", data);

          if (response.ok) {
            return {
              id: data.user._id,
              name: data.user.username,
              token: data.token, 
              user : data.user
            };
          } else {
            throw new Error(data.message || "Login failed");
          }
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token , user } :any) {
      return { ...token, ...user };
    },
    async session({ session, token, user } :any ) {
      return { ...session, ...token , ...user };
    },
  },
};
