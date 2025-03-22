import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as userRouter } from "./src/routes/users";
import { router as listRouter } from "./src/routes/lists";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ROUTES
app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);

app.use("/", (req, res) => {
  res.send("<h1>What u are looking for??</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
