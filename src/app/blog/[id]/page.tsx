import React from "react";
import Image from "next/image";
import { fetchSingleBlog } from "@/Services";
import { useParams } from "next/navigation";
import CommentsForm from "@/components/commentsForm";

const BlogDetails =  async ({params}:any) => {

  const BlogDetail = await fetchSingleBlog(params.id)
  return (
    <main className="w-full  py-5">
      <div className="px-3 w-[90%] m-auto grid place-items-center gap-3">
        <div className="w-full">
          <div className="relative overflow-hidden w-[90%] h-[200px] bg-red-800 m-auto">
        <Image src={BlogDetail.imageUrl} fill alt="blog" className="" />
          </div>
          <p className="py-3 px-5 text-lg text-justify">
          {BlogDetail?.desc}
          </p>
        </div>
      </div>
      <div>
        <CommentsForm/>
        
      </div>
    </main>
  );
};

export default BlogDetails;
