import { User } from '../models/userModel.js';

// for signup user data send to database
export const signUp = async (req, res) => {
   try {
      const { fullName, email, id, profilePicture } = req.body;
      
      let user = await User.findOne({email});
      if (user) {
         // if name of the user is change the edit it in database
         if (user.fullName!==fullName) {
            user.fullName = fullName;
            await user.save();
         }
         
         // if profilePicture of the user is change the edit it in database
         if (user.profilePicture!==profilePicture) {
            user.profilePicture = profilePicture;
            await user.save();
         }
         
         if (user.id!==id) {
            user.id = id;
            await user.save();
         }
         
         return res.status(201).json({
            success:false,
            message: 'this user already exists'
         })
      }
      
      user = new User({fullName, email, id, profilePicture});
      
      await user.save();
      
      return res.status(201).json({
         success:true,
         message:'user created successfully',
         user
      })
      
      
   } catch (error) {
      console.log(error);
   }
};