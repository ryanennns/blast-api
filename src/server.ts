import express from "express";
import cors from "cors";
import multer from "multer";
import * as fs from "node:fs";
import { logToMatch } from "./services/logParser";
import { saveParsedMatch } from "./services/saveParsedMatch";
import {
  getMatch,
  getMatchHalves,
  getMatchKills,
  getMatchRounds, listMatches,
} from "./controllers/matches.controller";

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

  const match_id = await saveParsedMatch(match);

  fs.unlinkSync(path);

  match_id
    ? res.json({ match_id })
    : res.status(500).json({ error: "Failed to save match" });
});

app.get("/matches", listMatches);
app.get("/matches/:uuid", getMatch);
app.get("/matches/:uuid/kills", getMatchKills);
app.get("/matches/:uuid/rounds", getMatchRounds);
app.get("/matches/:uuid/halves", getMatchHalves);

app.listen(3900, () => {
  console.log("Server running on http://0.0.0.0:3900");
});
