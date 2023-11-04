import React, { useEffect, useState } from 'react';
import {format}  from "timeago.js"
// import parse from 'html-react-parser';


const Comments = () => {
  const [comments, setComments] = useState([]);

 

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Comments
          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment}</span>
                  {' '}
                  on
                  {' '}
                  {format(comment)}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full"></p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
