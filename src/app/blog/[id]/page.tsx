import React from "react";
import Image from "next/image";
import { fetchSingleBlog } from "@/Services";
import {format} from 'timeago.js'
import { useParams } from "next/navigation";
import CommentsForm from "@/components/commentsForm";
import Comments from "@/components/comments";
import moment from "moment";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import {getServerSession} from "next-auth/next";





const BlogDetails =  async ({params}:any) => {

  const BlogDetail = await fetchSingleBlog(params.id)
  const idx = params.id as string
  return (
    <main className="w-full  py-5">
      <div className="px-3 w-[90%] m-auto grid place-items-center gap-3">
        <div className="w-full">
          <div className="font-bold my-8 text-2xl">{BlogDetail?.title}</div>
          <div className="relative overflow-hidden w-[90%] h-[200px] bg-red-800 m-auto">
        <Image src={BlogDetail.imageUrl} fill alt="blog" className="" />
          </div>
          <div className="m-3 py-5 px-2">
        <p className="text-black m-2 mb-4 shadow-md font-semibold text-base w-full flex justify-between"><span> Author: <span>Enoch Promise</span> </span> Time posted: {moment(BlogDetail?.createdAt).format("MMM DD, YYYYY")}  </p>
        </div>
        {
            BlogDetail
                            ? (
                                <div className=''>
                                    <Link className='' href={`/blog/edit/${BlogDetail._id}`}>
                                        Edit <BsFillPencilFill />
                                    </Link>
                                    <button type='button' className=''>
                                        Delete
                                        <AiFillDelete />
                                    </button>
                                </div>
                            )
                            : (
                                <div className=''>
                                    Author: <span>{BlogDetail?.authorId?.username}</span>
                                </div>
                            )
                    }
          <p className="py-3 px-5 text-lg text-justify">
          {BlogDetail?.desc}
          </p>
        </div>
      </div>
      <div>
      
        <CommentsForm idx={idx}/>
        <Comments id={params.id}/>
        {/* console.log(id); */}
        
        
      </div>
    </main>
  );
};

export default BlogDetails;
