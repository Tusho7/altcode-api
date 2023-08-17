import bodyParser from "body-parser";
import express from "express";
import connectToMongo from "./config/mongo.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
connectToMongo();

app.use(bodyParser.json());

app.listen(3000);
