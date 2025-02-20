import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';

export default function MySection() {
   const navigate = useNavigate();
   const { isSignedIn, isLoaded, user } = useUser();

   useEffect(() => {
      if (isLoaded && !isSignedIn) {
         navigate('/');
      }
   }, [isLoaded, isSignedIn, navigate]);

   return (
      <div className="flex flex-col p-4">
         <h1 className="text-3xl font-semibold mb-4 mx-auto underline">Welcome</h1>
         {user && (<>
            <div className="bg-gray-100 dark:bg-gray-800 p-9 rounded-lg shadow-md text-center">
               <div className="flex justify-center items-center flex-row gap-3 animate-bounce">
                  <img src="/logo.jpg" alt="logo" className="h-20 rounded-lg shadow-md shadow-gray-400 dark:shadow-slate-900" />
                  <ArrowLeftRight size={55} className="text-2xl" />
                  <img src={user.imageUrl} alt="User Avatar" className="w-20 h-20 rounded-full mb-3" />
               </div>
               <p className="text-lg font-medium">{user.fullName}</p>
               <p className="text-sm text-gray-700 dark:text-gray-200">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div className="p-9">
               Share your images with Imagify and chill...
            </div>
         </>)}
      </div>
   );
}