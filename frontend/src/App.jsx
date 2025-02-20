import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import MySection from './pages/MySection.jsx';
import MyImages from './pages/MyImages.jsx';
import Image from './pages/Image.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

function App() {
   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
   
   if (!PUBLISHABLE_KEY) {
     return <div>Loading...</div>
   }
   
  

   return (
      <div className="w-screen">
         <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
               <SidebarProvider className="w-screen">
                  <BrowserRouter>
                     <AppSidebar />
                     <div className="w-screen">
                        <Navbar />
                        <Routes>
                           <Route path="/" element={<Main />} />
                           <Route path="/my-section" element={<MySection />} />
                           <Route path="/my-images" element={<MyImages />} />
                           <Route path="/my-images/:id" element={<Image />} />
                           <Route path="/about" element={<About />} />
                           <Route path="/contact" element={<Contact />} />
                        </Routes>
                     </div>
                     <Toaster />
                  </BrowserRouter>
               </SidebarProvider>
            </ThemeProvider>
         </ClerkProvider>
      </div>
   )
}

export default App
