import db from "@/lib/db";
import { jwtVerify } from "@/lib/jwt";
import Comment from "@/models/comments";

export async function GET(req:Request, {id}:any){
    await db.connect()

    // blog id !!
    

    try {
        const comments = await Comment.find({blogId: id}).populate('authorId')

        return new Response(JSON.stringify(comments), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}

export async function DELETE(req:Request, ctx:any){
    await db.connect()

    const id = ctx.params.id
    const accessToken : any = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const decodedToken:any = jwtVerify(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const comment = await Comment.findById(id)
        if(comment.authorId._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({msg: "Only author can delete his blog"}), {status: 401})
        }

        await Comment.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully deleted comment'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}