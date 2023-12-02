"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import {useSession} from 'next-auth/react'
import { useRouter } from "next/navigation";


// import parse from 'html-react-parser';

interface Commentss {
  _id: string;
  blogId: string;
  userId: {username: string, _id:string}
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  
}
const Comments = ({ id }: any) => {
  const [comments, setComments] = useState<Commentss[]>([]);
  const {data: session} = useSession()
  const token = session?.user?.accessToken

  
  console.log(comments);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/comment/${id}`, {cache: "no-store"});
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
        
      }
       
    };
    fetchComment();
  }, []);


  const handleDeleteComment = async(id:string) => {
    try {
      await fetch(`http://localhost:3000/api/comment/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: "DELETE"
      })

      setComments(prev => {
        return [...prev].filter((c) => c?._id !== id)
      })
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, repellendus. Velit adipisci vel voluptas voluptates recusandae minus culpa similique! Magnam recusandae corrupti, laborum reiciendis, quos similique quisquam id officia, consequatur ratione minima accusantium a autem vero hic. Quam, sunt soluta?</p>
      {comments.length && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <h4>{comment?.userId?.username}</h4>
              <p> {moment(comment.createdAt).format("MM DD, YYYY")}</p>
              <div className="flex justify-between">
              <p className="mb-4">
                <span className="font-semibold">{comment.text}</span>
              </p>
              <div className=''>
           {session?.user === comment?.userId && (
             <BsTrash className='cursor-pointer'  onClick={()=> handleDeleteComment(comment._id)} />
           )}
        </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
