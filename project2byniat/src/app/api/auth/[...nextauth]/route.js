import Credentials from "next-auth/providers/credentials";
import connectDB from "@/utils/db";
import NextAuth from "next-auth";

import User from "@/models/usermodel";


const authOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials){
                if(!credentials.email || !credentials.password){
                    throw new Error("Please enter all the fields");
                }
                await connectDB();
                const user = await User.findOne({email: credentials.email});
                if(!user || user.password !== credentials.password){
                    throw new Error("Invalid Credentials");
                }

                return {id: user._id, email: user.email, name: user.name};
            }
        })
    ],
    session:{
        strategy: "jwt"
    },
    pages:{
        signIn: "/login"
     
    },
    
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id;
            }
            return token;
        },


        async session({session, token}){
            if(token){
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };