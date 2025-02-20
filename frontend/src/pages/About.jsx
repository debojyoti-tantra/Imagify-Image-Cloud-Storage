import React from 'react';

export default function About() {
   return (
      <div className="p-3 max-w-3xl mx-auto text-center">
         <h1 className="text-3xl font-bold mb-3">About Imagify</h1>
         <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">
            Welcome to <span className="font-semibold">Imagify</span>, a modern and user-friendly image-cloud platform built with the MERN stack. Imagify allows users to upload, share, and interact with images seamlessly.
         </p>

         {/* Features Section */}
         <div className="text-left">
            <h2 className="text-2xl font-semibold mb-2">✨ Key Features</h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-200">
               <li>Upload and manage images effortlessly.</li>
               <li>Interactive sharing via WhatsApp, Telegram, and Twitter.</li>
            </ul>
         </div>

         {/* About the Developer */}
         <div className="mt-6 text-left">
            <h2 className="text-2xl font-semibold mb-2">👨‍💻 About the Developer</h2>
            <p className="text-gray-700 dark:text-gray-200">
               Imagify is developed by <span className="font-semibold">Debojyoti Tantra</span>, a passionate web developer currently pursuing a BSc in Physics (3rd Semester). With a keen interest in full-stack development, he specializes in working with the MERN stack, React, Next.js, and MongoDB Atlas.
            </p>
         </div>

         {/* Future Plans */}
         <div className="mt-6 text-left">
            <h2 className="text-2xl font-semibold mb-2">🚀 Future Enhancements</h2>
            <p className="text-gray-700 dark:text-gray-200">
               Imagify is an evolving platform. Future updates will include enhanced profile customization, better image compression, and additional social media integrations.
            </p>
         </div>
      </div>
   );
}