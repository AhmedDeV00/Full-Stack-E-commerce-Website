import cors from "cors";
import multer from "multer";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import db from "./connect.js";
import productRoutes from "./routes/product.js"
import authRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";


// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// mongodb connection
db();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:5173'],  // Allow requests from this origin
    credentials: true,
}));
app.use(cookieParser())


// Image Storage in upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

// Create Upload Endpoint for images 
const upload = multer({ storage: storage });
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')))


app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log("Request received");
    const file = req.file;
    if (file) {
        console.log("File received:", file);
        res.status(200).json(file.filename);
    } else {
        console.log("No file received");
        res.status(400).json({ success: 0, message: "No file received" });
    }
});

app.use("/", productRoutes)
app.use("/", authRoutes)

app.use(express.json());

app.listen(3001, (error) => {
    if (!error) {
        console.log("server is running ");
    } else {
        console.log(error);
    }
});
