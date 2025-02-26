import React, { useRef, useState, useEffect } from 'react';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
   const navigate = useNavigate();
   const form = useRef();
   const { isSignedIn, user, isLoaded } = useUser();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   const [feedbacks, setFeedbacks] = useState([]);
   
   useEffect(() => {
      if (isLoaded && !isSignedIn) {
         navigate('/');
      }
   }, [isLoaded, isSignedIn]);

   const sendEmail = async (e) => {
      e.preventDefault();
      if (!isSignedIn) {
         toast.error('Please sign in before sending a message.');
         return;
      }
      setLoading(true);
      
      if (!form.current) {
         toast.error("Form not found! Please try again.");
         setLoading(false);
         return;
      }
      
      try {
         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback/addfeedback`, {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            message
         }, {
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true
         });
         
         if (res.data.success) {
            toast.success(res.data.message);
            
            setFeedbacks((pre) => [res.data.feedback, ...pre]);
            setMessage('');
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
   };
   
   useEffect(() => {  
      const fetchAllFeedbacks = async () => {
         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback/getallfeedbacks`, { withCredentials:true });
         if (res.data.success) {
            setFeedbacks(res.data.feedbacks);
         }
      };
      
      fetchAllFeedbacks();
   }, []);
   
   if (!isLoaded) {
      return (
         <div className="max-w-3xl mx-auto m-4 p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-64 mb-6" />
            <div className="flex flex-col gap-4">
               <Skeleton className="h-6 w-40" />
               <Skeleton className="h-6 w-64" />
               <Skeleton className="h-32 w-full" />
               <Skeleton className="h-10 w-full" />
            </div>
         </div>
      );
   }

   return (<>
      <div className="max-w-3xl mx-auto m-4 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
         <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
         <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Have any questions or feedback? Reach out to us!
         </p>

         <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
            
            <div>
               <div>
                  Name: {user?.fullName}
               </div>
               <div>
                  Email: {user?.primaryEmailAddress?.emailAddress}
               </div>
            </div>
            
            
            {/* Message Input */}
            <div>
               <label className="block text-gray-700 dark:text-gray-300 mb-1">Message</label>
               <Textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" required placeholder="Your message here..." className="w-full h-[20vh]" />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
               {loading ? <Loader2 className="animate-spin" /> : 'Send Message'}
            </Button>
         </form>
      </div>
      
      {user?.primaryEmailAddress?.emailAddress === 'tantradebojyoti@gmail.com' && (
         <div className="mt-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">All Feedbacks</h2>
      
            {feedbacks.length > 0 ? (
               feedbacks.map((f) => (
                  <div key={f._id} className="border-b border-gray-300 dark:border-gray-700 p-4 mb-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                     {/* Name & Email */}
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{f.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{f.email}</span>
                     </div>
      
                     {/* Message */}
                     <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                        {f.message}
                     </p>
      
                     {/* Date */}
                     <p className="text-xs text-gray-500 dark:text-gray-400">
                        Submitted on: {new Date(f.createdAt).toLocaleString()}
                     </p>
                  </div>
               ))
            ) : (
               <p className="text-gray-600 dark:text-gray-400 text-center">No feedback available.</p>
            )}
         </div>
      )}
   </>);
}