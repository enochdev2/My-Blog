import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import bcrypt from "bcrypt"
import db from "@/lib/db";
import { jwtSignIn } from "@/lib/jwt";
// import { types } from "util";

// interface Credentials{
//     username: string,
//     password: string | number,
// }

const handler =  NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID as string,
        //     clientSecret: process.env.GOOGLE_SECRET as string,
        //     authorization: {
        //       params: {
        //         prompt: "consent",
        //         access_type: "offline",
        //         response_type: "code"
        //       }
        //     }
        //   }),
        CredentialsProvider({
            type: 'credentials',
            credentials: { },
          async authorize(credentials, req){
                const {email, password:pass} = credentials as unknown as { email: string;
                password: string;
            };

                await db.connect()

                const user = await User.findOne({email})

                if(!user){
                    throw new Error("Invalid input")
                }
                const comparePassword = await bcrypt.compare(pass, user.password)

                if(!comparePassword) {
                    throw new Error("incorrect Email or Password")
                }else{

                    const {password, ...currentUser} = user._doc
    
                    const accessToken = await jwtSignIn(currentUser)
                    console.log("accessToken:", accessToken)
                    
                    return {
                        ...currentUser,
                        accessToken
                    }
                    
                }
            },
            
        }) 
    ],
    pages:{
        signIn: "/login"
    },
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.accessToken = user.accessToken 
                token._id = user._id
            }

            return token
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id
                session.user.accessToken = token.accessToken
            }

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
})

export {handler as GET, handler as POST}