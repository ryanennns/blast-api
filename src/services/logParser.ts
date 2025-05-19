import { FLASHED_REGEX, KILL_FEED_REGEX, THREW_REGEX } from "./const";

export const parseLog = (text: string) => {
  const kills = text.match(KILL_FEED_REGEX) ?? [];
  const flashes = text.match(FLASHED_REGEX) ?? [];
  const throws = text.match(THREW_REGEX) ?? [];

  console.log(flashes[0]);

  return {
    totalLines: text.split("\n").length,
    rounds: (text.match(/Round_Start/g) || []).length,
    kills: (kills || []).length,
    flashes: (flashes || []).length,
    throws: {
      total: throws.length,
      smokegrenade: throws.filter((t) => t.includes("smokegrenade")).length,
      flashbang: throws.filter((t) => t.includes("flashbang")).length,
      hegrenade: throws.filter((t) => t.includes("hegrenade")).length,
      molotov: throws.filter((t) => t.includes("molotov")).length,
    },
  };
};
