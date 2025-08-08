import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import expressListRoutes from "express-list-routes";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

connectDB().then(
    () => {
        console.log("✅ Database connected. Logging registered routes...");
        // expressListRoutes(app); // Uncomment to log routes
        
        app.listen(process.env.PORT || 8000, () =>{
            console.log(`🚀 UncleFab Backend Server is running on port ${process.env.PORT || 8000}`);
            console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
            console.log(`🔐 OAuth: Google ${process.env.GOOGLE_CLIENT_ID ? '✓' : '✗'}`);
        });
    }
).catch((err) => {
    console.log("❌ MongoDB Connection failed in src/index.js ", err);
}); 