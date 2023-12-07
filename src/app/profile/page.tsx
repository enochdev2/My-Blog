"use client";
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../../firebase';
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface Image {
  setImageUrl: (value: React.SetStateAction<string>) => void;
}

export default function Profile() {
  const router = useRouter();

  const CLOUD_NAME = "dg9ikhw52";
  const UPLOAD_PRESET = "My_Blog";
  const { data: session, status } = useSession();

  const fileRef = useRef(null);
  const [file, setFile] = useState("");
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  // const [formData, setFormData] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [imageUrls, setImageUrl] = useState({});

  // if(!session){
  //   router.push('/login')
  // }

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  // useEffect(() => {
  //   async function fetchInfo() {
  //       const res = await fetch(`http://localhost:3000/api/blog/${params.id}`)
  //       const blog = await res.json()

  //       setTitle(blog.title)
  //       setDesc(blog.desc)
  //       setCategories(blog.categories)
  //       setImageUrl(blog.imageUrl)
  //   }
  //   fetchInfo()
  // }, [])

  // useEffect(() => {
  //   if (file) {
  //     handleFileUpload(file);
  //   }
  // }, [file]);

  console.log(
    "🚀 ~ file: page.tsx:97 ~ handleSubmit ~ session?.user?.email:",
    session?.user?.email
  );

  // console.log(imageUrls);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log();

    try {
      let imageUrl = null;
      if (imageUrls) {
        imageUrl = await uploadImage();
        if (imageUrl) {
          setFile(imageUrl);
        }
      }

      const body: {
        username: string;
        email: any;
        password: string;
        imageUrl?: string;
      } = {
        username,
        email: session?.user?.email,
        password,
      };

      if (imageUrl != null) {
        body.imageUrl = imageUrl;
      }

      const res = await fetch(
        `http://localhost:3000/api/user/${session?.user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!imageUrls) return;

    const formData = new FormData();

    formData.append("file", imageUrls);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrls = data["secure_url"];

      return imageUrls;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" p-3 max-w-screen-lg mx-auto">
      <input
        onChange={(e) => setImageUrl(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      <img
        onClick={() => fileRef.current.click()}
        src={file || session?.user?.avatar}
        alt="profile"
        className="rounded-full m-auto mb-4 h-32 w-32 object-cover bg-slate-500 cursor-pointer self-center mt-2"
      />
      <form
        onSubmit={handleSubmit}
        className=" flex-col grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="username"
          defaultValue={session?.user?.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={session?.user?.email}
          className="border p-3 rounded-lg"
        />

        <>
        <div>
          <label className="block text-left">Country</label>
          <input
            // disabled={disabled}
            type="text"
            placeholder="Country"
            className="border p-3 rounded-lg w-full"
            // value={country || ''} onChange={ev => setAddressProp('country', ev.target.value)}
          />
          </div>
          <div>
            <label className="block">Phone</label>
            <input
              // disabled={disabled}
              type="tel"
              placeholder="Phone number"
              className="border p-3 rounded-lg w-full"
              // value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)}
            />
          </div>
          <div>
            <label className="block">Street address</label>
            <input
              // disabled={disabled}
              type="text"
              placeholder="Street address"
              className="border p-3 rounded-lg w-full"
              // value={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block">Postal code</label>
              <input
                // disabled={disabled}
                type="text"
                placeholder="Postal code"
                className="border p-3 rounded-lg"
                // value={postalCode || ''} onChange={ev => setAddressProp('postalCode', ev.target.value)}
              />
            </div>
            <div>
              <label>City</label>
              <input
                // disabled={disabled}
                type="text"
                placeholder="City"
                className="border p-3 rounded-lg"
                // value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}
              />
            </div>
          </div>
          <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="border p-3 rounded-lg"
        />
        </>

        <button
          title="buttton"
          disabled={status === "loading"}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {status === "loading" ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          //   onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span
          onClick={() => {
            signOut();
          }}
          className="text-red-700 cursor-pointer"
        >
          Sign out
        </span>
      </div>
      <ToastContainer />
    </div>
  );
}
