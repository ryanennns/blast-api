import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello from the server!",
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
