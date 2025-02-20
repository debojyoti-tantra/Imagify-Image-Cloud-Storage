import { requireAuth } from '@clerk/express';

const isAuthenticated = (req, res, next) => {
   try {
      // Clerk automatically attaches user info to req.auth
      if (!req.auth || !req.auth.userId) {
         return res.status(401).json({ success: false, message: "Unauthorized Access" });
      }

      // Save userId of clerk in req.id to use it in other routes
      req.id = req.auth.userId;

      next();
   } catch (error) {
      console.error("Auth Middleware Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
   }
};

export default isAuthenticated;