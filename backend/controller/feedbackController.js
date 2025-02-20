import { Feedback } from '../models/feedbackModel.js';

// add a feedback
export const addFeedback = async (req, res) => {
   try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
         return res.status(400).json({
            success: false,
            message: 'All fields are required'
         });
      }

      const newFeedback = new Feedback({ name, email, message });
      await newFeedback.save();

      return res.status(201).json({
         success: true,
         message: 'Feedback submitted successfully',
         feedback: newFeedback
      });

   } catch (error) {
      console.error(error);
      return res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
};

// get all feedback
export const getAllFeedback = async (req, res) => {
   try {
      const feedbacks = await Feedback.find().sort({createdAt: -1});

      return res.status(200).json({
         success: true,
         feedbacks
      });

   } catch (error) {
      console.error(error);
      return res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
};