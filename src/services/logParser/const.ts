export const KILL_REGEX =
  /"([^"<]+)<[^>]+><[^>]+><[^>]+>"\s+\[[^\]]+\]\s+killed\s+"([^"<]+)<[^>]+><[^>]+><[^>]+>" \[.*\] with "(.*)"(?: \((headshot)\))?/;
export const ASSIST_REGEX =
  /"([^"<]+)<[^>]+><[^>]+><[^>]+>"\s+assisted killing\s+"([^"<]+)<[^>]+><[^>]+><[^>]+>"/;
export const FLASH_ASSIST_REGEX =
  /"([^"<]+)<[^>]+><[^>]+><[^>]+>"\s+flash-assisted killing\s+"([^"<]+)<[^>]+><[^>]+><[^>]+>"/;

export const CT_TEAM_REGEX = /Team playing "CT": (.*)/g;
export const TERRORIST_TEAM_REGEX = /Team playing "TERRORIST": (.*)/g;
export const HALFTIME_REGEX = /.*mp_halftime_pausematch.*/g;

export const TERRORISTS_WIN_INDICATOR = "SFUI_Notice_Terrorists_Win";
export const CTS_WIN_INDICATOR = "SFUI_Notice_CTs_Win";
export const TARGET_BOMBED_INDICATOR = "SFUI_Notice_Target_Bombed";
export const BOMB_DEFUSED_INDICATOR = "SFUI_Notice_Bomb_Defused";
