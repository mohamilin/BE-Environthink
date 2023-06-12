import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import infografisRoute from "./routes/infografisRoute.js";
import userRoute from "./routes/userRoute.js";
import donasiRoute from "./routes/donasiRoute.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("assets"));

app.use(infografisRoute);
app.use(userRoute);
app.use(donasiRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});