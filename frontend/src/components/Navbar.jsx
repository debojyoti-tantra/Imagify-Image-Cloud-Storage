import React from 'react';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {Button} from './ui/button.jsx';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {ModeToggle} from './mode-toggle.jsx';

export default function  Navbar()  {
   const { isSignedIn, user, isLoaded } = useUser();
   
   const handelSignIn = async () => {
      try {
         const fullName = user?.fullName;
         const profilePicture = user?.imageUrl;
         const id = user?.id;
         const email = user?.primaryEmailAddress?.emailAddress;
         
         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
            fullName,
            profilePicture,
            id,
            email
         },{
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true
         });
      } catch (error) {
         console.log(error);
      }
   };
   
   useEffect(() => {
      if (user) {
         handelSignIn();
      }
   }, [user]);
   
   return (
      <nav className="flex items-center justify-between px-5 py-2 bg-gray-200 dark:bg-slate-700 w-full shadow shadow-gray-300">
         <div><SidebarTrigger className="text-xl" /></div>
         <div>
            <img src="/logo.jpg" alt="logo image" className="h-10 rounded-md shadow-md shadow-gray-400 dark:shadow-slate-800" />
         </div>
         <div className="flex gap-3 justify-center items-center">
            <span><ModeToggle /></span>
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
      </nav>
   );
};