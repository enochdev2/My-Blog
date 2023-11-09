import db from "@/lib/db";
import { jwtSignIn, jwtVerify } from "@/lib/jwt";
import Comment from "@/models/comments";


export async function POST(req:Request) {

    db.connect()

    const accessToken = req.headers.get("authorizaion")
    const token = accessToken?.split(" ")[1]

    const decodedToken = jwtVerify(token)
    
    if(!decodedToken){
        return new Response(JSON.stringify({message: "unauthorized"}), {status: 401})
    }
    

    try {
        const body = req.json()

        let comment = new Comment.(body)
        await comment.save()
        return new Response(JSON.stringify(comment), {status: 201})
    } catch (error:any) {
        return new Response(JSON.stringify({message : error.message}), {status: 500})

        
    }

}