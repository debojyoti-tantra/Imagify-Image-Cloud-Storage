import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '../components/ui/button.jsx';

export default function  MyImages()  {
   const navigate = useNavigate();
   const { isSignedIn, user, isLoaded } = useUser();
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   
   useEffect(() => {
      if (isLoaded && !isSignedIn) {
         navigate('/');
      }
   }, [isLoaded, isSignedIn]);
   
   useEffect(() => { 
      const fetchUserPost = async () => {
         try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/userallpost`, {withCredentials:true});
            if (res.data.success) {
               setPosts(res.data.posts);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };
      
      fetchUserPost();
   }, []);
   
   
   return (
      <div className="m-3">
         <h1 className="flex justify-center items-center mb-2 text-xl underline">My Images</h1>
         
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
         {  
            loading ? (
               [1,2,3,4,5,6,7,8,9].map((post, index) => {
                  return <div key={index} className="flex flex-col gap-2 justify-center items-center">
                     <Skeleton className="w-[40vw] sm:w-[25vw] h-[19vh] sm:h-[29vh] rounded-lg" />
                     <Skeleton className="w-[40vw] sm:w-[25vw] h-[2vh] sm:h-[3vh] rounded" />
                  </div>
               })
            ) : (
               posts.length !== 0 ? (
                  posts.map((post) => {
                     return <div key={post._id}>
                        <div className="bg-slate-200 dark:bg-slate-900 flex flex-col justify-center items-center rounded-lg">
                           <Link to={post._id}>
                              <img src={post.image} alt="post_image" className="object-contain sm:h-[30vh] h-[20vh]" />
                           </Link>
                        </div>
                        {post.caption && <div className="text-center my-1">{post.caption}</div>}
                     </div>
                  })
               ) : (
                  <div className="m-5">
                        <p className="text-lg text-gray-500">No posts yet...</p>
                        <p className="text-sm text-gray-400">It looks like you haven't uploaded anything yet. Why not add your first image?</p>
                        <Button className="mt-4 py-2 px-4 rounded">
                           <Link to="/">Add Image</Link>
                        </Button>
                     </div>
               )
            )
            
         }
         </div>
         
      </div>
   );
};
