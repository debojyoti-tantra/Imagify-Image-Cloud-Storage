# Imagify - Your Personal Cloud for Images 🚀

Imagify is a MERN stack-based cloud image storage platform where users can upload, store, and share images securely. It offers a seamless experience with modern UI, authentication, and cloud storage integration.


---

## 🚀 Features

- ✅ Secure Authentication – Powered by Clerk Auth.
- ✅ Upload & Store – Save images with captions effortlessly.
- ✅ Image Preview – Preview before uploading.
- ✅ Cloud Storage – Integrated with Cloudinary for storage.
- ✅ Dark Mode Support – Modern UI with a stylish theme.
- ✅ Fast & Responsive – Optimized for all devices.


---

## 🛠️ Tech Stack

### Frontend

- React 19 + Vite

- React Router DOM

- Tailwind CSS

- Clerk Authentication

- Axios for API Requests

- Lucide React Icons

- Sonner for Notifications


### Backend

- Node.js + Express.js

- MongoDB (Mongoose)

- Cloudinary for Image Storage

- Multer for File Uploads

- Sharp for Image Processing

- Cors & Dotenv



---

## 📂 Project Structure

📦 Imagify  
┣ 📂 backend  
┃ ┣ 📜 index.js  
┃ ┣ 📂 routes  
┃ ┣ 📂 controllers  
┃ ┣ 📂 models  
┃ ┣ 📂 middleware  
┃ ┣ 📜 .env  
┃ ┣ 📜 package.json  
┃ ┗ 📜 README.md  
┣ 📂 frontend  
┃ ┣ 📂 src  
┃ ┣ 📜 App.jsx  
┃ ┣ 📜 main.jsx  
┃ ┣ 📜 .env  
┃ ┣ 📜 package.json  
┃ ┣ 📜 tailwind.config.js  
┃ ┗ 📜 README.md  
┗ 📜 README.md


---

## 🔧 Installation & Setup

- 1️⃣ Clone the Repository
```sh
git clone https://github.com/debojyoti-tantra/Imagify-Image-Cloud-Storage.git
cd Imagify-Image-Cloud-Storage
```

- 2️⃣ Backend Setup
```sh
cd backend
pnpm install
cp .env.example .env  # Add your environment variables
pnpm run dev  # Start the server
```

- 3️⃣ Frontend Setup
```sh
cd ../frontend
pnpm install
cp .env.example .env  # Add your environment variables
pnpm run dev  # Start the frontend
```

---

## 📌 Environment Variables

- Create a .env file in both backend and frontend directories with the following keys:

- Backend (.env)
```sh
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
Frontend (.env)
```sh
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

## 🚀 Run the Project

- Start the backend
```sh
cd backend
npm run dev
```
- Start the frontend
```sh
cd frontend
npm run dev
```

---

## 💡 Contributing

- Feel free to contribute! Fork the repo, make changes, and submit a PR.


---

## 🔗 Live Demo: [Deploy Link Here]
## 🔥 Imagify – Your Personal Image Cloud! 🚀🥰🙏🥰