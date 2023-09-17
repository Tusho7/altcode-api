import bodyParser from "body-parser";
import express from "express";
import connectToMongo from "./config/mongo.js";
import dotenv from "dotenv";
import userRouter from "./routes/user-router.js";
import cors from "cors";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";


const app = express();
dotenv.config();
connectToMongo();

app.use(bodyParser.json());
app.use(cors());
app.use("/avatars", express.static("public/avatar"));

app.use("/api", userRouter);
app.use("/", ...swaggerMiddleware());

app.listen(process.env.port || 3000);
