import React from "react";
import Image from "next/image";
import FeaturedPosts from "@/components/FeaturedPosts";
import Categories from "@/components/Categories";
import RelatedPost from "@/components/RelatedPost";
import { fetchBlog } from "@/Services";
import Link from "next/link";



const Blog = async () => {
  const blogs: any = await fetchBlog();

  console.log(blogs);
  const classNames = "dark:bg-teal-800 bg-white flex gap-4 flex-col shadow-lg rounded-lg p-8 pb-12 mb-8"
  return (
    <main className="w-full pt-0 p-4">
      {/* <div className="px-3 w-[70%]  my-4 grid  md:grid-cols-2 place-items-center grid-cols-1 gap-4"></div>
      <div></div> */}
     <div className=" mt-0 w-full  m-auto border border-b-lime-700 text-xl text-center"> 
     <Categories classNames={`"dark:bg-teal-800 flex justify-between  bg-white items-center w-full shadow-lg rounded-lg p-8 pb-2 mb-12"`}/>
     FeaturedPosts </div>
      <div className="container  mx-auto px-10 mt-4 mb-8">
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-15">
          <div className="lg:col-span-8 col-span-1 my-15">
            {blogs.map((blog: any, index: number) => (
              <div key={index} className="my-14 shadow-md py-5 px-4">
                
                  <div className="relative w-[95%] h-36 lg:h-52 m-auto ">
                    <Image
                      src={blog.imageUrl}
                      fill
                      className=" m-auto "
                      alt="blog"
                    />
                  </div>
                  <h2 className="font-bold my-2 text-xl">{blog.title}
                  {blog.id}</h2>
                  <p>{`${blog.desc}`.substring(1, 200)}...
                  <Link href={`blog/${blog._id}`} className="">
                  <button type="button" className="py-1 px-3 ml-5 text-white bg-cyan-700 rounded-md hover:bg-teal-600 ">Read More</button>
                </Link>
                  </p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="md:hidden lg:block relative top-8">
              <RelatedPost />
              <Categories classNames={classNames}/>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Blog;
