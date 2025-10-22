import Credentials from "next-auth/providers/credentials";
import connectDB from "@/utils/db";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "@/models/usermodel";

dotenv.config();

export const authOptions = {
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

                if(!user){
                    throw new Error("Invalid Credentials");
                }

                const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

                if(!isPasswordMatch){
                    throw new Error("Invalid Credentials");
                }

                return {id: user._id, email: user.email};
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
                token.email = user.email;
            }
            return token;
        },


        async session({session, token}){
            if(token){
                session.user.email = token.email;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };