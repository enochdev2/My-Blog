'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



const ReletedPost = ({params}:any) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const path = usePathname()
  
// const id = params.id;

console.log(relatedPosts);
console.log(path);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        
        const res = await fetch(`http://localhost:3000/api/blog/relatedPost`, { cache: 'no-store' }) 
        const data = await res.json();
        setRelatedPosts(data);
      } catch (error) {
        console.log(error);
        
      }
    }
   fetchBlog()
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{path == '/blog' ?  'Recent Posts': 'Related Posts' }</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full py-2 px-1 rounded-lg bg-neutral-200 mb-4">
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height="60"
              width="60"
              unoptimized
              className="align-middle rounded-full"
              src={post.imageUrl}
            />
          </div>
          <div className="flex-grow ml-4">
           
            {/* <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p> */}
            <Link href={`blog/${post._id}`}
            // href={`//${._id}`} 
            className="text-sm" 
            key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReletedPost;
