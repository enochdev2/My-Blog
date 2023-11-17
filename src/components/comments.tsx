"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { format } from "timeago.js";
// import parse from 'html-react-parser';

interface Commentss {
  _id: string;
  blogId: string;
  userId: {username: string}
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  
}
const Comments = ({ id }: any) => {
  const [comments, setComments] = useState<Commentss[]>([]);

  const handleDeleteComment = () => {};

  useEffect(() => {
    const fetchComment = async () => {
      const res = await fetch(`http://localhost:3000/api/comment/${id}`);
      const data = await res.json();
      console.log("data:", data);
      setComments(data);
    };
    fetchComment();
  }, []);

  return (
    <>
      {comments.length > 0 && (
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
              <div>
                <BsTrash className="pointer" onClick={handleDeleteComment} />
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
