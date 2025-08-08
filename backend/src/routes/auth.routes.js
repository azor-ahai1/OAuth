import { Router } from "express";
import passport from "passport";
import { handleOAuthLogin } from "../controllers/user.controller.js";

const router = Router();

// Google OAuth routes
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", 
    passport.authenticate('google', { failureRedirect: '/login' }),
    handleOAuthLogin
);

export default router;