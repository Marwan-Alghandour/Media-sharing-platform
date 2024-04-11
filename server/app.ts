import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import runDb from "./model";
import mediaRouter from "./router/media";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/media", mediaRouter);

dotenv.config();

const PORT = process.env.PORT || 3000;

runDb();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
