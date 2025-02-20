import { Post } from '../models/postModel.js';
import { User } from '../models/userModel.js';
import sharp from 'sharp';
import cloudinary from '../utils/cloudinary.js';

// create a new post
export const createPost = async (req, res) => {
   try {
      const { caption } = req.body;
      const image = req.file;
      // get clerk id
      const clerkUserId = req.id;
   
      // find the user from clerkUserId
      const user = await User.findOne({id: clerkUserId});
      const authorId = user._id;
      
      
      if (!image) {
         return res.status(400).json({ message: 'Image required.', success:false });
      }
      
      // decrease the quality of image
      const optimizedImageBuffer = await sharp(image.buffer)
         .resize({width:800, height:800, fit:'inside'})
         .toFormat('jpeg', {quality:80})
         .toBuffer();
      
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
      const cloudResponse = await cloudinary.uploader.upload(fileUri);  // upload the image in cloudinary
      
      const post = await Post.create({
         caption,
         image:cloudResponse.secure_url,
         author:authorId
      });
      
      
      if (user) {
         user.posts.push(post._id);
         await user.save();
      }
      
      await post.populate({path:'author'});
      
      return res.status(201).json({
         post,
         success:true,
         message:'New Post Added'
      });
   } catch (error) {
      console.log(error);
   }
   
};

// get  one user all post
export const getUserAllPost = async (req, res) => {
   try {
      const clerkUserId = req.id;
      const user = await User.findOne({id: clerkUserId});
      const authorId = user._id;
      
      const posts = await Post.find({author: authorId}).sort({createdAt: -1}).populate({
         path: 'author'
      });
      
      return res.status(200).json({
         success: true,
         message: 'All posts',
         posts
      });
      
      
   } catch (error) {
      console.log(error);
   }
};


// get post by it's id
export const getPost = async (req, res) => {
   try {
      const postId = req.params.id;
      const post = await Post.findById(postId).populate({path:'author'});
      
      if (!post) {
         return res.status(404).json({
            success: false,
            message:'post not found!'
         });
      }
      
      return res.status(201).json({
         success:true,
         message:'post fetched successfully',
         post
      });
   } catch (error) {
      console.log(error);
   }
};

// delete a post
export const deletePost = async (req, res) => {
   try {
      const postId = req.params.id;
      const clerkUserId = req.id;
      let user = await User.findOne({id: clerkUserId});
      const authorId = user._id;
      
      if (!user) {
         return res.status(404).json({
            success: false,
            message: 'User not found'
         });
      }
      
      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({
            message:'post not found',
            success:false
         });
      }
      
      // cheak login user is owner of the post or not
      // if you are not owner of the image then you can't delete the image
      if (!post.author.equals(authorId)) {
         return res.status(403).json({
            message:'post is not your',
            success:false
         });
      }
      
      // delete the post
      await Post.findByIdAndDelete(postId);
      // remove the user form user model
      user.posts = user.posts.filter(id => id.toString() !== postId);
      await user.save();
      
      return res.status(200).json({
         success:true,
         message:'post deleted'
      });
      
   } catch (error) {
      console.log(error);
   }
};