import express from "express"
import http from "http"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    })
);
app.get('/', (req, res) => {
    res.send('Express server');
  });
  const PORT = process.env.PORT || 10000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });