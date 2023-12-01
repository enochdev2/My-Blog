"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBlog } from "@/Services";

const Categories = ({classNames}:any) => {
  const [categorie, setCategories] = useState([]);

  useEffect(() => {
    fetchBlog().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <div className={`${classNames}`}>
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories:</h3>

      <Link href="/">
        <span
          className={`cursor-pointer border-b p-3 m-3`}
        >
          Finance
        </span>
      </Link>
      <Link href="/">
        <span
        className={`cursor-pointer border-b p-3 m-3`}
        >
          Business
        </span>
      </Link>
      <Link href="/">
        <span
         className={`cursor-pointer border-b p-3 m-3`}
        >
          Leadership
        </span>
      </Link>
      <Link href="/">
        <span
          className={`cursor-pointer border-b p-3 m-3`}
        >
          Family
        </span>
      </Link>
      <Link href="/">
        <span
         className={`cursor-pointer border-b p-3 m-3`}
        >
          LifeStyle
        </span>
      </Link>

      {/* {categorie.map((category, index) => (
        <Link key={index} href='/'
        >
          <span className={`cursor-pointer block ${(index === categorie.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>
            {category.categories}
            </span>
        </Link>
      ))} */}
    </div>
  );
};

export default Categories;
