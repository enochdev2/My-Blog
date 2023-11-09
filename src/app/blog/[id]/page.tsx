import React from "react";
import Image from "next/image";
import { fetchSingleBlog } from "@/Services";
import {format} from 'timeago.js'
import { useParams } from "next/navigation";
import CommentsForm from "@/components/commentsForm";
import Comments from "@/components/comments";




const BlogDetails =  async ({params}:any) => {

  const BlogDetail = await fetchSingleBlog(params.id)
  return (
    <main className="w-full  py-5">
      <div className="px-3 w-[90%] m-auto grid place-items-center gap-3">
        <div className="w-full">
          <div>{BlogDetail?.title}</div>
          <div className="relative overflow-hidden w-[90%] h-[200px] bg-red-800 m-auto">
        <Image src={BlogDetail.imageUrl} fill alt="blog" className="" />
          </div>
          <div className="m-3 py-5 px-2">
        <p className="text-black m-2 mb-4 shadow-md font-semibold text-base">Time: {format(BlogDetail?.createdAt)}</p>
        </div>
          <p className="py-3 px-5 text-lg text-justify">
          {BlogDetail?.desc}
          </p>
        </div>
      </div>
      <div>
        <CommentsForm/>
        <Comments/>
        
      </div>
    </main>
  );
};

export default BlogDetails;
