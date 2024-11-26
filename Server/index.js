import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/database.js";
import { respond } from "./utils/response.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import userRouter from "./routes/user.js"
import adminRouter from "./routes/admin.js"
import vendorRouter from "./routes/vendor.js"
import individualRouter from "./routes/individual.js"
import ticketRoutes from './routes/ticketRoutes.js';
import cors from "cors";
import ReviewRoutes from "./routes/reviewRoutes.js";


const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}))

app.use(
    cors({
        origin: ['http://localhost:3000', 'https://startup-seven-lovat.vercel.app'],
        credentials: true,
    })
)

cloudinaryConnect();

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/vendor", vendorRouter)
app.use("/api/v1/individual", individualRouter)
app.use("/api", ticketRoutes)
app.use("/api/reviews", ReviewRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://startup-seven-lovat.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // If credentials are required
    next();
});





app.get("/", (req, res) => {
    return respond(res, "Your Server is up and running", 200, true)
});

app.listen(PORT, () => {
    console.log(`your server started at ${PORT}`)
});