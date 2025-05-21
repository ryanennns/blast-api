import express from "express";
import cors from "cors";
import multer from "multer";
import * as fs from "node:fs";
import { logToMatch } from "./services/logParser";
import { saveParsedMatch } from "./services/saveParsedMatch";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello from the server!",
  });
});

app.post("/upload", upload.single("logFile"), async (req, res) => {
  const path = req?.file?.path ?? "";
  const rawLog = fs.readFileSync(path, "utf-8");

  const match = logToMatch(rawLog);

  await saveParsedMatch(match);

  fs.unlinkSync(path);
  res.json({ match });
});

app.listen(3900, () => {
  console.log("Server running on http://localhost:3900");
});
