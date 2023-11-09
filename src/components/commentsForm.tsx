'use client'
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, ChangeEvent } from 'react';


// interface Data {
//     commentText: string,
// }
const CommentsForm = () => {
  const [error, setError] = useState(false);
  // const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [commentText, setCommentText] = useState<String>('');
const {data: session, status} = useSession();



  const handlePostSubmission = async () => {
   const res = await fetch('http://localhost:3000/api/comment', {
    method: 'Post',
    headers:{
      "Content-Type": "Application/json",
      'Authorization': `Bearer ${session?.user?.accessToken}`

    },
    body: JSON.stringify({text: commentText})
   })
  };

  return (
    <div className="bg-white w-11/12 shadow-lg rounded-lg p-8 pb-12 my-8 m-auto">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
        onChange={(e) => e.target.value} 
        className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
    
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
      </div>
    </div>
  );
};

export default CommentsForm;
