import mongoose from 'mongoose';

const connectDB = async () => {
   await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Database is connected');
   }).catch((error) => {
      console.log(error);
   });
};

export default connectDB;
