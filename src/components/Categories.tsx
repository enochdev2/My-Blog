'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchBlog } from '@/Services';



const Categories = () => {
  const [categorie, setCategories] = useState([]);

   useEffect(() => {
    fetchBlog().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categorie.map((category, index) => (
        <Link key={index} href='/'
        // href={`/category/${category.slug}`}
        >
          <span className={`cursor-pointer block ${(index === categorie.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>
            {category.categories}
            </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
