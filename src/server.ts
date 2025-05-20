import express from "express";
import cors from "cors";
import multer from "multer";
import * as fs from "node:fs";
import { logToScoreboard } from "./services/logParser";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello from the server!",
  });
});

app.post("/upload", upload.single("logFile"), (req, res) => {
  const path = req?.file?.path ?? "";
  const rawLog = fs.readFileSync(path, "utf-8");

  const scoreboard = logToScoreboard(rawLog);

  fs.unlinkSync(path);
  res.json({scoreboard});
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
