"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { NavBarItem } from '../../interface'
import { FaBars} from "react-icons/fa"
import Image from 'next/image'
import ThemeToggler from './theme'

import { BiSearchAlt } from 'react-icons/bi'


const Navbar = () => {
  const [navMenu, setNavMenu] = useState<boolean>(false)

const item : NavBarItem[] =  [
  {
    id: 1,
    name: "HOME",
    link: "/"
  },
  {
    id: 2,
    name: "BLOG",
    link: "/blog"
  },
  {
    id: 3,
    name:" SERVICE",
    link: "/service"
  },
  {
    id: 4,
    name:" ABOUT",
    link: "/about"
  },
  {
    id: 5,
    name:" PROFILE",
    link: "/login"
  }
]


  return (
    <div className='w-screen h-20  to-blue-400 via-green-700  '>
      <div className="flex w-full px-4 m-auto justify-between items-center h-full gap-3  ">
        
        <div className='relative flex flex-3 gap-2'>
          <Image src='/insight.jfif' width={80} height={40} alt="logo" />
          {/* <h2 className='font-extrabold absolute'><Link href='/'>TECH-NOCH</Link></h2> */}
        </div>

        <div className='flex shadow-sm border-4 border-white flex-2 ' >
          <form className=" w-full flex relative">
            <div className=' overflow-hidden w-full rounded-md'>
            <input type="text" name="search" id="search" className='px-2 w-full outline-none' placeholder='search' />
            </div>
            <button type='submit' title='submit' className='absolute  bg-lime-600 right-0 rounded-md bg-transparent px-2 z-2'>
              <BiSearchAlt size={25}/>
              </button>
          </form>
        </div>

        <div className='md:flex flex-1 justify-between items-center hidden  gap-5'>  
            {item.map((items:NavBarItem, id:number)=>(

            <Link href={items.link} key={id} className="py-2 px-4 bg-slate-400 rounded-xl hover:bg-white">
              {items.name}
            </Link>
            ))}
        </div>

        <div className="md:flex flex-1 hidden  justify-end gap-3">
        <div className="bg-red">
                  <ThemeToggler />
            </div>
        </div>
        <FaBars size={30}  className=" md:hidden cursor-pointer" />
      </div>
    </div>
  )
}

export default Navbar