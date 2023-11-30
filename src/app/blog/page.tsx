import React from "react";
import Image from "next/image";
import FeaturedPosts from "@/components/FeaturedPosts";
import Categories from "@/components/Categories";
import PostWidget from "@/components/PostWidget";
import { fetchBlog } from "@/Services";
import Link from "next/link";



const Blog = async () => {
  const blogs: any = await fetchBlog();

  console.log(blogs);

  return (
    <main className="w-full p-4">
      {/* <div className="px-3 w-[70%]  my-4 grid  md:grid-cols-2 place-items-center grid-cols-1 gap-4"></div>
      <div></div> */}
     <div className="p-3 mt-12  m-auto border-b border-b-lime-700 text-xl text-center"> 
     <Categories/>
     FeaturedPosts </div>
      <div className="container mx-auto px-10 mt-4 mb-8">
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
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Blog;
