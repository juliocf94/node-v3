// src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "@routes/index.js";
import errorHandler from "@utils/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

app.use(errorHandler);

// Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
