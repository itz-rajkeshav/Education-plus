import express from "express"
import http from "http"
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import _logger from "pino-http"
import createVideo from "./routes/video.routes.js"
import googleSIgnIn from "./routes/googleAuth.routes.js"
import createCourse from "./routes/course.routes.js"
const logger = _logger();
dotenv.config();  
const app = express();
const server = http.createServer(app);
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.json({limit: "20kb"}));  

app.get('/', (req, res) => {
    res.send('server online');
  });
  app.use("/api/v1/user",userRoute);
  app.use("/api/v1/user",googleSIgnIn);
  app.use("/api/v1/user",createVideo);
  app.use("/api/v1/user",createCourse);
  const PORT = process.env.PORT || 10000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });