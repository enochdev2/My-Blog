"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavBarItem } from "../utils/types";
import { FaBars, FaSearch } from "react-icons/fa";
import Image from "next/image";
import ThemeToggler from "./theme";

import { BiSearchAlt } from "react-icons/bi";

const Navbar = () => {
  const [navMenu, setNavMenu] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);

  const item: NavBarItem[] = [
    {
      id: 1,
      name: "HOME",
      link: "/",
    },
    {
      id: 2,
      name: "BLOG",
      link: "/blog",
    },
    {
      id: 3,
      name: " SERVICE",
      link: "/service",
    },
    {
      id: 4,
      name: " ABOUT",
      link: "/about",
    },
    {
      id: 5,
      name: " PROFILE",
      link: "/profile",
    },
  ];


  function handleStickyNavbar() {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);

    }

    useEffect(() => {
      window.addEventListener("scroll", handleStickyNavbar);
    });



  return (
    <header 
    className={`top-0 left-0 z-40 flex w-full gap-3 items-center bg-[#7E909A] mb-10
    ${
      sticky
        ? "!fixed !z-[9999] !bg-[#7E909A] !bg-opacity-90 shadow-sticky backdrop:blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
        : "absolute"
    }
    `}
    // className="bg-slate-200 shadow-md"
    >
      <div className="flex justify-between gap-5 items-center w-full mx-auto p-3 ">
        <Link href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">My-</span>
            <span className="text-slate-700">Insight</span>
          </h1>
        </Link>
        <form
          // onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button title="submit" type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 mx-2">         
            
              {item.map((items: NavBarItem, id: number) => (
                <Link 
                  href={items.link}
                  key={id}
                  className="hidden sm:inline text-slate-700  rounded-lg bg-[#A5D8DD] px-2 py-1"
                >
                  {items.name}
                </Link>
              ))}
         
          
          <Link href="/profile">
            {/* {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )} */}
          </Link>
          <li className="hidden sm:inline text-slate-700 hover:underline">
              <ThemeToggler />
            </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
