import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import {Button} from '../components/ui/button.jsx';
import {Input} from '../components/ui/input.jsx';
import { readFileAsDataUri } from '../lib/utils.js';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function  Main()  {
   const navigate = useNavigate();
   const [caption, setCaption] = useState('');
   const [file, setFile] = useState('');
   const [imagePreview, setImagePreview] = useState('');
   const [loading, setLoading] = useState(false);
   
   const { isSignedIn, user, isLoaded } = useUser();
   
   const fileChangeHanlder = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
         setFile(file);
         const dataUri = await readFileAsDataUri(file);
         setImagePreview(dataUri);
      }
   };
   
   const UploadPostHandler = async (e) => {
      const formData = new FormData();
      formData.append("caption", caption);
      // formData.append("email", user?.primaryEmailAddress?.emailAddress);
      if (imagePreview && file) {
         formData.append("image", file);
      }
      
      try {
         setLoading(true);
         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/add`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
         });
         
         if (res.data.success) {
            setImagePreview('');
            setFile('');
            setCaption('');
            navigate('/my-images')
            toast.success(res.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };
   
   if (!isLoaded) {
      return (
         <div className="flex flex-col items-center justify-center text-white p-6">
            {/* Skeleton for the entire content */}
            <div className="sm:w-[50%]">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-32 mx-auto" />
                <Skeleton className="h-3 w-48 mx-auto mt-2" />
              </div>
              <div className="flex flex-col gap-4 mt-2">
                {/* Skeleton for caption input */}
                <Skeleton className="h-5 w-full" />
                {/* Skeleton for file input */}
                <Skeleton className="h-5 w-full" />
                {/* Skeleton for image preview */}
                <Skeleton className="h-[25vh] w-full" />
              </div>
              <div>
                {/* Skeleton for button */}
                <Skeleton className="h-10 w-32 rounded-md mx-auto mt-3" />
              </div>
            </div>
         </div>
      );
   }

   if (!isSignedIn) {
      return (
         <div className="flex flex-col items-center justify-center text-white p-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-md text-center">
               <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                  Welcome to <span className="text-blue-500 dark:text-blue-400">Imagify</span> 🚀
               </h2>
               <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Sign in to access the amazing features of Imagify, your personal cloud service for storing and sharing images with ease.
               </p>
               <header>
                  <SignedOut>
                     <Button>
                       <SignInButton />
                     </Button>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>
            </div>
         </div>
      );
   }

   return (
      <div>
         <div className="flex justify-center items-center m-4">
            <Card className="sm:w-[50%]">
              <CardHeader>
                <CardTitle className="mx-auto">Upload Image</CardTitle>
                <CardDescription className="mx-auto">Your Own Image Cloud</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div><Input value={caption} onChange={(e) => setCaption(e.target.value)} type="text" placeholder="caption..." /></div>
                  <div><Input type="file" onChange={fileChangeHanlder} /></div>
                  {
                     imagePreview && <div className="flex justify-center items-center">
                        <img src={imagePreview} alt="imagePreview" className="h-[35vh] object-contain" />
                     </div>
                  }
              </CardContent>
              <CardFooter>
               {
                  loading ? (
                     <Button className="mx-auto">
                        <Loader2 className="animate-spin mr-1" />
                        Please Wait
                     </Button>
                  ) : (
                     <Button onClick={UploadPostHandler} className="mx-auto">Upload</Button>
                  )
               }
              </CardFooter>
            </Card>
         </div>
      </div>
   );
};