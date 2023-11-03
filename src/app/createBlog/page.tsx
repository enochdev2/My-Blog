'use client'

import { useRouter } from 'next/navigation'
import React,{FormEvent, useState} from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Create_post = () => {
  const CLOUD_NAME = 'dg9ikhw52'
  const UPLOAD_PRESET = 'My_Blog'

const [title, setTitle] = useState('')
const [desc, setDesc] = useState('')
const [imageUrls, setImageUrl] = useState('')
const [categories, setCategories] = useState('')


// const { data: session, status } = useSession()
const router = useRouter()


// if (status === 'loading') {
//     return <p>Loading...</p>
// }

// if (status === 'unauthenticated') {
//     return <p className={classes.accessDenied}>
//         Access Denied
//     </p>
// }


const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if(!imageUrls || !title || !categories || !desc){
      toast.error("All fields are required")
      return
  }
console.log(title);

  try {
    const imageUrl = await uploadImage()
    console.log(imageUrls);
    
    const res = await fetch(`https://localhost:3000/api/blog`, {
      headers: {
         'Content-Type': 'application/json',
        //  'Authorization': `Bearer ${session?.user?.accessToken}` 
      },
      method: 'POST',
      body: JSON.stringify({title,desc,categories,imageUrl,
      })
      // userId: session?.user?._id
    })

    if(!res.ok){
      throw new Error("Error occured")
    }

    const blog = await res.json()

    router.push(`/blog/${blog?._id}`)
  } catch (error) {
      console.log(error)
  }
}


const uploadImage = async () => {
  if (!imageUrls) return

  const formData = new FormData()

  formData.append("file", imageUrls)
  formData.append("upload_preset", UPLOAD_PRESET)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    const imageUrls = data['secure_url']

    return imageUrls
  } catch (error) {
      console.log(error)
  }
}

  return (
    <section className='w-screen h-screen pt-10 bg-slate-200 '>
      <div className='w-11/12 m-auto  bg-slate-400 h-fit  py-10 px-10'>
        <form onSubmit={handleSubmit} className='flex w-full flex-col justify-between gap-5 border-l-indigo-100'>
          <h3 className='font-bold text-3xl'>Create a post</h3>
          <div className='flex flex-col'>
            <label htmlFor="title" className='font-bold text-lg'>Title</label>
              <input type="text" name="title" id="title" className='h-10 px-2 py-5' 
              onChange={(e)=> setTitle(e.target.value)}/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="desc" className='font-bold text-lg '>Description</label>
            <textarea name="desc" id="desc" className='h-30 py-4 px-3'
            onChange={(e)=> setDesc(e.target.value)}>

            </textarea>
          </div>

          <div>
            <label htmlFor="image" className='font-bold gas-6 flex flex-row text-lg border-2 bg-slate-400 rounded-md px2 py-3'>
            <AiOutlineFileImage size='25' /> <p> Upload Image</p>
            </label>
            <input type="file" name="image" id="image" value={imageUrls} className={!imageUrls ?'hidden': "block"}
            onChange={(e)=> setImageUrl(e.target.value)}
            />
            
          </div>
          <div className='flex gap-3'>
            <label htmlFor="categories" className='font-bold text-lg '>Categories</label>
            <select  title="categories" name="categories" id="category"
            className='w-lg'
            onChange={(e)=> setCategories(e.target.value)}>
              <option value="all">All</option>
              <option value="finance">Finance</option>
              <option value="leadership">Leadership</option>
              <option value="family">Family</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className='m-auto w-10/12'>
            <button title='submit' className='w-full bg-gradient-to-r from-emerald-700 to-indigo-400 text-2xl font-semibold rounded-lg py-2 '>
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  )
}

export default Create_post