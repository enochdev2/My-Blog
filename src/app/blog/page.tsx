import React from "react";
import Image from "next/image";
import FeaturedPosts from "@/components/FeaturedPosts";
import Categories from "@/components/Categories";
import PostWidget from "@/components/PostWidget";
import { fetchBlog } from "@/Services";
import Link from "next/link";
import { log } from "console";

// const blo = [
//   {
//     image:''
//   }
// ]

const Blog = async () => {
  const blogs: any = await fetchBlog();

  console.log(blogs);

  return (
    <main className="w-full p-4">
      {/* <div className="px-3 w-[70%]  my-4 grid  md:grid-cols-2 place-items-center grid-cols-1 gap-4"></div>
      <div></div> */}

      <div className="container mx-auto px-10 mb-8">
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {blogs.map((blog: any, index: number) => (
              <div key={index}>
                <Link href={`blog/${blog._id}`}>
                  <div className="relative w-[95%] h-36 lg:h-52 m-auto">
                    <Image
                      src={blog.imageUrl}
                      fill
                      className=" m-auto "
                      alt="blog"
                    />
                  </div>
                  <h2 className="font-bold my-2 text-xl">{blog.title}
                  {blog.id}</h2>
                  <p>{blog.desc}</p>
                </Link>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>

      {/* {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))} */}
    </main>
  );
};

export default Blog;
