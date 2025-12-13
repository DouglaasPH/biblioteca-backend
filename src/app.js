import express from "express";
import authorRoutes from "./routes/authorRoutes.js";

const app = express();
app.use(express.json());

app.use("/authors", authorRoutes);

export default app;
