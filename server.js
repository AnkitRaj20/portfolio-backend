import cors from "cors";
import express from "express";
// import router from "../src/routes/index.js";
import fileUpload from "express-fileupload";
import compression from "compression";
import path from "path";
import { globalErrorHandler } from "./src/utils/error.util.js";
import router from "./src/routes/index.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(compression());
app.use(express.json());
app.use(fileUpload());
app.use("/static", express.static("src/public"));

app.use(express.static(path.resolve("./src/public/")));

app.use((req, res, next) => {
  // console.log(req.origin)
  console.log(req.method, req.path);
  next();
});


// API routes
app.use("/api/v1", router);
app.use(globalErrorHandler);

// Export the server
export default app;
