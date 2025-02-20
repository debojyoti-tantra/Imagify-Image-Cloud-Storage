import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, SquareCheckBig, ArrowDownToLine, Share2 } from 'lucide-react';
import { FaWhatsapp, FaTelegram, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import { useUser } from '@clerk/clerk-react';
import { Button } from '../components/ui/button.jsx';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function Image() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [post, setPost] = useState({});
   const [copied, setCopied] = useState(true);
   const [loading, setLoading] = useState(false);
   const { isSignedIn, user, isLoaded } = useUser();

   useEffect(() => {
      if (isLoaded && !isSignedIn) {
         navigate('/');
      }
   }, [isLoaded, isSignedIn]);

   useEffect(() => {  
      const fetchPost = async () => {
         try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/getpost/${id}`, { withCredentials: true });
            if (res.data.success) {
               setPost(res.data.post);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };
      fetchPost();
   }, []);

   const postURL = `${import.meta.env.VITE_FRONTEND_URL}/my-images/${id}`;

   // Copy Image URL
   const handleCopy = () => {
      navigator.clipboard.writeText(postURL);
      toast('copied!!');
      setCopied(false);
      setTimeout(() => setCopied(true), 2000);
   };

   // Download Image
   const handleDownload = async () => {
      const response = await fetch(post.image);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `image-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   // Share on Social Media
   const handleShare = (platform) => {
      let shareURL = '';
      const message = `Check out this image: ${postURL}`;

      switch (platform) {
         case 'whatsapp':
            shareURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
            break;
         case 'telegram':
            shareURL = `https://t.me/share/url?url=${encodeURIComponent(postURL)}&text=${encodeURIComponent(message)}`;
            break;
         case 'twitter':
            shareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postURL)}&text=${encodeURIComponent(message)}`;
            break;
         case 'instagram':
            toast("Instagram doesn't allow direct link sharing. You can manually copy the link.");
            return;
         default:
            return;
      }

      window.open(shareURL, '_blank');
   };
   
   const handelDeletePost = async () => {
      try {
         const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/delete/${id}`, { withCredentials: true });
         if (res.data.success) {
            toast.success(res.data.message);
            navigate('/my-images');
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   };
   
   
   if (loading) {
      return (
         <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
               <Skeleton className="sm:w-[70%] max-h-[70vh] h-[300px]" />

               <div className="w-full flex flex-col gap-2">
                  {/* User Info Skeleton */}
                  <div className="flex items-center gap-3">
                     <Skeleton className="w-12 h-12 rounded-full" />
                     <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-4" />
                        <Skeleton className="w-32 h-3" />
                     </div>
                  </div>

                  {/* Caption & Details Skeleton */}
                  <Skeleton className="w-full h-4 mt-3" />
                  <Skeleton className="w-[80%] h-4 mt-2" />
                  <Skeleton className="w-[50%] h-4 mt-2" />

                  {/* Copy Button Skeleton */}
                  <div className="flex items-center gap-3 mt-3">
                     <Skeleton className="w-40 h-8" />
                  </div>

                  {/* Buttons Skeleton */}
                  <div className="flex gap-3 mt-3">
                     <Skeleton className="w-10 h-10 rounded" />
                     <Skeleton className="w-10 h-10 rounded" />
                     <Skeleton className="w-10 h-10 rounded" />
                     <Skeleton className="w-10 h-10 rounded" />
                     <Skeleton className="w-10 h-10 rounded" />
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="p-4">
         {post && post.image ? (
            <div className="flex flex-col sm:flex-row gap-3">
               <img src={post.image} alt="post_image" className="sm:w-[60%] max-h-[70vh] object-contain" />
               <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-center items-center gap-2">
                     <Avatar>
                        <AvatarImage src={post?.author?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                     <div className="text-lg font-bold">
                        <p>{post?.author?.fullName}</p>
                        <p>{post?.author?.email}</p>
                     </div>
                     
                     
                     
                  </div>

                  <div className="flex flex-col gap-2">
                     <div>Created At: {new Date(post.createdAt).toLocaleString()}</div>
                     <div>Caption: {post?.caption || 'No caption is present.'}</div>
                     
                     {/* Copy Image URL */}
                     <div className="flex items-center gap-3">
                        <p>Copy the image URL:</p> 
                        <Button onClick={handleCopy} className="py-1 px-3">
                           {copied ? <Copy /> : <SquareCheckBig />}
                        </Button>
                     </div>

                     {/* Email to Author */}
                     <a href={`mailto:${post?.author?.email}?subject=I am ${user?.fullName}, I am giving feedback on the post ${post._id} & post caption: ${post.caption}`} className="text-violet-800 dark:text-violet-400 underline">
                        SEND AN EMAIL TO AUTHOR OF THE IMAGE
                     </a>

                     {/* Download & Share */}
                     <div className="flex justify-center items-center gap-3">
                        
                        <Dialog>
                           <DialogTrigger>
                              <button className="px-2 py-1 bg-red-700 rounded-md text-white">
                                 <MdOutlineDelete size={30} />
                              </button>
                           </DialogTrigger>
                           <DialogContent>
                              <DialogHeader className="flex flex-col gap-2">
                                 <DialogTitle className="mx-auto">Are you want to delete the post?</DialogTitle>
                                 <DialogDescription className="flex justify-center items-center gap-5">
                                    <DialogClose>
                                       <Button>Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={handelDeletePost} variant="destructive">Delete</Button>
                                 </DialogDescription>
                              </DialogHeader>
                           </DialogContent>
                        </Dialog>
                        
                        <Button onClick={handleDownload} className="py-1 px-3">
                           <ArrowDownToLine />
                        </Button>

                        {/* WhatsApp Share */}
                        <Button onClick={() => handleShare('whatsapp')} className="py-1 px-3 bg-green-500 text-white">
                           <FaWhatsapp size={20} />
                        </Button>

                        {/* Telegram Share */}
                        <Button onClick={() => handleShare('telegram')} className="py-1 px-3 bg-blue-500 text-white">
                           <FaTelegram size={20} />
                        </Button>

                        {/* Twitter Share */}
                        <Button onClick={() => handleShare('twitter')} className="py-1 px-3 bg-blue-400 text-white">
                           <FaTwitter size={20} />
                        </Button>

                        {/* Instagram Share */}
                        <Button onClick={() => handleShare('instagram')} className="py-1 px-3 bg-pink-500 text-white">
                           <FaInstagram size={20} />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <div>Post not found</div>
         )}
      </div>
   );
};