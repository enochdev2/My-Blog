import Blog from "@/models/Blog";
import { jwtVerify } from "@/lib/jwt";
import  db from "@/lib/db";

export async function GET(req:Request) {
  try {
    // await connectDB();
    await db.connect()
    

    const data = await Blog.find()
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: any) {
    console.log(error.message);
    return new Response(JSON.stringify(error.message), { status: 401 });
  }
}

export async function POST(req:any) {
 await db.connect()
  // const accessToken = req.header.get("authorization")
  // // const token = accessToken.split(" ")[1]

  // const decodedToken = jwtVerify(token)
  
  // if(!decodedToken){
  //   return new Response(JSON.stringify({error: "unauthorize"}))
  // }

  const body = await req.json()
  const newBlog = new Blog(body)
  
  try {
    await newBlog.save()
    console.log(newBlog);
        return new Response(JSON.stringify(newBlog), { status: 201 })
    } catch (error:any) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
    
}