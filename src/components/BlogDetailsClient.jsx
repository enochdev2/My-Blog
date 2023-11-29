'use client'

import React, { useState } from "react"
import Link from "next/link"
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete, AiFillLike, AiOutlineDislike} from "react-icons/ai";


const BlogDetailsClient = ({id,BlogDetail}) => {
    const [isLiked, setIsLIked] = useState(true)
  const [blogLikes, setBlogLIkes] = useState(0)


  const handleLike = () => {}



  return (
    <>
      <div className='flex w-full justify-between m-3 px-4'>
      <div className=''>
                        Category:
                        <span>{BlogDetail?.categories}</span>
       </div>
                    <div className='flex'>
                        {blogLikes} {" "} {isLiked ? <AiFillLike size={20} onClick={handleLike} /> : <AiOutlineDislike  size={20} onClick={handleLike} />}
                    </div>
            {BlogDetail && (
              <div className="flex gap-4">
                <Link className="flex" href={`/blog/edit/${id}`}>
                  Edit 
                  <BsFillPencilFill />
                </Link>
                <button type="button" className="flex">
                  Delete
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
    </>
  )
}

export default BlogDetailsClient
