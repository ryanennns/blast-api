export const KILL_REGEX =
  /"([^"<]+)<[^>]+><[^>]+><[^>]+>"\s+\[[^\]]+\]\s+killed\s+"([^"<]+)<[^>]+><[^>]+><[^>]+>" \[.*\] with "(.*)"(?: \((headshot)\))?/;
export const ASSIST_REGEX =
  /"([^"<]+)<[^>]+><[^>]+><[^>]+>"\s+assisted killing\s+"([^"<]+)<[^>]+><[^>]+><[^>]+>"/;
export const FLASH_ASSIST_REGEX =
  /"([^"<]+)<[^>]+><[^>]+><[^>]+>"\s+flash-assisted killing\s+"([^"<]+)<[^>]+><[^>]+><[^>]+>"/;
