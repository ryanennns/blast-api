import express from "express";
import cors from "cors";
import multer from "multer";
import * as fs from "node:fs";
import {FLASHED_REGEX, KILL_FEED_REGEX, THREW_REGEX} from "./services/const";

const app = express();
const upload = multer({dest: 'uploads/'});

app.use(cors());

app.get("/", (req, res) => {
    res.send({
        message: "Hello from the server!",
    });
});


app.post('/upload', upload.single('logFile'), (req, res) => {
    const path = req?.file?.path ?? '';
    const rawLog = fs.readFileSync(path, 'utf-8');

    const parsedData = parseLog(rawLog);

    console.log(parsedData);

    fs.unlinkSync(path);
    res.json(parsedData);
});

function parseLog(text: string) {
    const kills = text.match(KILL_FEED_REGEX) ?? [];
    const flashes = text.match(FLASHED_REGEX) ?? [];
    const throws = text.match(THREW_REGEX) ?? [];

    return {
        totalLines: text.split('\n').length,
        rounds: (text.match(/Round_Start/g) || []).length,
        kills: (kills || []).length,
        flashes: (flashes || []).length,
        throws: {
            total: throws.length,
            smokegrenade: throws.filter(t => t.includes('smokegrenade')).length,
            flashbang: throws.filter(t => t.includes('flashbang')).length,
            hegrenade: throws.filter(t => t.includes('hegrenade')).length,
            molotov: throws.filter(t => t.includes('molotov')).length,
        },
    };
}


app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
