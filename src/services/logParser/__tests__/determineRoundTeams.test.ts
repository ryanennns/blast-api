import { determineRoundTeams } from "../index";

const theBadRound = `
11/28/2021 - 21:12:27: World triggered "Round_End"
11/28/2021 - 21:12:27:  [FACEIT^] NAVI GGBET [4 - 11] TeamVitality
11/28/2021 - 21:12:27: "Perfecto<9><STEAM_1:0:80477379><TERRORIST>" money change 800+3250 = $4050 (tracked)
11/28/2021 - 21:12:27: "Boombl4<10><STEAM_1:0:92970669><TERRORIST>" money change 1350+3250 = $4600 (tracked)
11/28/2021 - 21:12:27: "s1mple<11><STEAM_1:1:36968273><TERRORIST>" money change 950+3250 = $4200 (tracked)
11/28/2021 - 21:12:27: "electronic<12><STEAM_1:1:41889689><TERRORIST>" money change 100+3250 = $3350 (tracked)
11/28/2021 - 21:12:27: "b1t<13><STEAM_1:0:143170874><TERRORIST>" money change 300+3250 = $3550 (tracked)
11/28/2021 - 21:12:27: "misutaaa<5><STEAM_1:1:60631591><CT>" money change 3700+1400 = $5100 (tracked)
11/28/2021 - 21:12:27: "apEX<6><STEAM_1:1:14739219><CT>" money change 1700+1400 = $3100 (tracked)
11/28/2021 - 21:12:27: "ZywOo<7><STEAM_1:1:76700232><CT>" money change 5950+1400 = $7350 (tracked)
11/28/2021 - 21:12:27: "Kyojin<8><STEAM_1:1:22851120><CT>" money change 2250+1400 = $3650 (tracked)
11/28/2021 - 21:12:27: "shox <14><STEAM_1:1:23327283><CT>" money change 1150+1400 = $2550 (tracked)
11/28/2021 - 21:12:27: "Boombl4<29><STEAM_1:0:92970669><TERRORIST>" dropped "tec9"
11/28/2021 - 21:12:27: "Perfecto<28><STEAM_1:0:80477379><TERRORIST>" dropped "ak47"
11/28/2021 - 21:12:28: "Perfecto<28><STEAM_1:0:80477379><TERRORIST>" dropped "deagle"
11/28/2021 - 21:12:28: "s1mple<30><STEAM_1:1:36968273><TERRORIST>" dropped "ak47"
11/28/2021 - 21:12:28: "s1mple<30><STEAM_1:1:36968273><TERRORIST>" dropped "glock"
11/28/2021 - 21:12:30: "shox <33><STEAM_1:1:23327283><CT>" say "gh"
11/28/2021 - 21:12:42: "misutaaa<24><STEAM_1:1:60631591>" switched from team <CT> to <TERRORIST>
11/28/2021 - 21:12:42: "apEX<25><STEAM_1:1:14739219>" switched from team <CT> to <TERRORIST>
11/28/2021 - 21:12:42: "ZywOo<26><STEAM_1:1:76700232>" switched from team <CT> to <TERRORIST>
11/28/2021 - 21:12:42: "Kyojin<34><STEAM_1:1:22851120>" switched from team <CT> to <TERRORIST>
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379>" switched from team <TERRORIST> to <CT>
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379><CT>" dropped "vesthelm"
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379><CT>" dropped "knife"
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379><CT>" dropped "flashbang"
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379><CT>" dropped "smokegrenade"
11/28/2021 - 21:12:42: "Boombl4<29><STEAM_1:0:92970669>" switched from team <TERRORIST> to <CT>
11/28/2021 - 21:12:42: "Boombl4<29><STEAM_1:0:92970669><CT>" dropped "vesthelm"
11/28/2021 - 21:12:42: "Boombl4<29><STEAM_1:0:92970669><CT>" dropped "knife"
11/28/2021 - 21:12:42: "s1mple<30><STEAM_1:1:36968273>" switched from team <TERRORIST> to <CT>
11/28/2021 - 21:12:42: "s1mple<30><STEAM_1:1:36968273><CT>" dropped "vesthelm"
11/28/2021 - 21:12:42: "s1mple<30><STEAM_1:1:36968273><CT>" dropped "knife"
11/28/2021 - 21:12:42: "s1mple<30><STEAM_1:1:36968273><CT>" dropped "flashbang"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689>" switched from team <TERRORIST> to <CT>
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" dropped "vesthelm"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" dropped "knife"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" dropped "deagle"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" dropped "m4a1"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" dropped "hegrenade"
11/28/2021 - 21:12:42: "b1t<35><STEAM_1:0:143170874>" switched from team <TERRORIST> to <CT>
11/28/2021 - 21:12:42: "shox <33><STEAM_1:1:23327283>" switched from team <CT> to <TERRORIST>
11/28/2021 - 21:12:42: Match pause is enabled - mp_halftime_pausematch
11/28/2021 - 21:12:42: Starting Freeze period
11/28/2021 - 21:12:42: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" picked up "knife"
11/28/2021 - 21:12:42: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" picked up "glock"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" picked up "knife"
11/28/2021 - 21:12:42: "electronic<31><STEAM_1:1:41889689><CT>" picked up "hkp2000"
11/28/2021 - 21:12:42: "Boombl4<29><STEAM_1:0:92970669><CT>" picked up "knife"
11/28/2021 - 21:12:42: "Boombl4<29><STEAM_1:0:92970669><CT>" picked up "hkp2000"
11/28/2021 - 21:12:42: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "knife"
11/28/2021 - 21:12:42: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "glock"
11/28/2021 - 21:12:42: "s1mple<30><STEAM_1:1:36968273><CT>" picked up "knife"
11/28/2021 - 21:12:42: "s1mple<30><STEAM_1:1:36968273><CT>" picked up "hkp2000"
11/28/2021 - 21:12:42: "b1t<35><STEAM_1:0:143170874><CT>" picked up "knife"
11/28/2021 - 21:12:42: "b1t<35><STEAM_1:0:143170874><CT>" picked up "hkp2000"
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379><CT>" picked up "knife"
11/28/2021 - 21:12:42: "Perfecto<28><STEAM_1:0:80477379><CT>" picked up "hkp2000"
11/28/2021 - 21:12:42: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" picked up "knife"
11/28/2021 - 21:12:42: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" picked up "glock"
11/28/2021 - 21:12:42: "shox <33><STEAM_1:1:23327283><TERRORIST>" picked up "knife"
11/28/2021 - 21:12:42: "shox <33><STEAM_1:1:23327283><TERRORIST>" picked up "glock"
11/28/2021 - 21:12:42: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "knife"
11/28/2021 - 21:12:42: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "glock"
11/28/2021 - 21:12:42: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "c4"
11/28/2021 - 21:12:42: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" triggered "Got_The_Bomb"
11/28/2021 - 21:12:42: MatchStatus: Team playing "CT": TeamVitality
11/28/2021 - 21:12:42: MatchStatus: Team playing "TERRORIST": NAVI GGBET
11/28/2021 - 21:12:42: MatchStatus: Score: 4:11 on map "de_nuke" RoundsPlayed: 15
11/28/2021 - 21:13:20: "Kyojin<8><STEAM_1:1:22851120><TERRORIST>" money change 800-300 = $500 (tracked) (purchase: weapon_p250)
11/28/2021 - 21:13:20: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "glock"
11/28/2021 - 21:13:20: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "p250"
11/28/2021 - 21:13:20: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" purchased "p250"
11/28/2021 - 21:13:21: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "p250"
11/28/2021 - 21:13:22: "Kyojin<8><STEAM_1:1:22851120><TERRORIST>" money change 500-300 = $200 (tracked) (purchase: weapon_p250)
11/28/2021 - 21:13:22: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "p250"
11/28/2021 - 21:13:22: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" purchased "p250"
11/28/2021 - 21:13:22: "apEX<25><STEAM_1:1:14739219><TERRORIST>" dropped "glock"
11/28/2021 - 21:13:22: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "p250"
11/28/2021 - 21:13:23: "apEX<25><STEAM_1:1:14739219><TERRORIST>" dropped "p250"
11/28/2021 - 21:13:23: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "glock"
11/28/2021 - 21:13:24: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" dropped "glock"
11/28/2021 - 21:13:24: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" picked up "p250"
11/28/2021 - 21:13:24: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "p250"
11/28/2021 - 21:13:24: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "glock"
11/28/2021 - 21:13:27: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" picked up "vest"
11/28/2021 - 21:13:27: "ZywOo<7><STEAM_1:1:76700232><TERRORIST>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:13:27: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" purchased "item_kevlar"
11/28/2021 - 21:13:30: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "glock"
11/28/2021 - 21:13:30: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "p250"
11/28/2021 - 21:13:44: "shox <33><STEAM_1:1:23327283><TERRORIST>" picked up "vest"
11/28/2021 - 21:13:44: "shox <14><STEAM_1:1:23327283><TERRORIST>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:13:44: "shox <33><STEAM_1:1:23327283><TERRORIST>" purchased "item_kevlar"
11/28/2021 - 21:13:45: "shox <33><STEAM_1:1:23327283><TERRORIST>" dropped "glock"
11/28/2021 - 21:13:45: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "p250"
11/28/2021 - 21:13:46: "shox <33><STEAM_1:1:23327283><TERRORIST>" picked up "p250"
11/28/2021 - 21:13:47: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "glock"
11/28/2021 - 21:13:48: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" picked up "vest"
11/28/2021 - 21:13:48: "misutaaa<5><STEAM_1:1:60631591><TERRORIST>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:13:48: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" purchased "item_kevlar"
11/28/2021 - 21:13:49: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "vest"
11/28/2021 - 21:13:49: "apEX<6><STEAM_1:1:14739219><TERRORIST>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:13:49: "apEX<25><STEAM_1:1:14739219><TERRORIST>" purchased "item_kevlar"
11/28/2021 - 21:13:52: "Kyojin<8><STEAM_1:1:22851120><TERRORIST>" money change 200-200 = $0 (tracked) (purchase: weapon_flashbang)
11/28/2021 - 21:13:52: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" picked up "flashbang"
11/28/2021 - 21:13:52: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" purchased "flashbang"
11/28/2021 - 21:13:54: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "flashbang"
11/28/2021 - 21:13:55: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" picked up "flashbang"
11/28/2021 - 21:14:00: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" dropped "flashbang"
11/28/2021 - 21:14:00: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "flashbang"
11/28/2021 - 21:14:02: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" triggered "Dropped_The_Bomb"
11/28/2021 - 21:14:02: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "c4"
11/28/2021 - 21:14:03: "apEX<25><STEAM_1:1:14739219><TERRORIST>" picked up "c4"
11/28/2021 - 21:14:03: "apEX<25><STEAM_1:1:14739219><TERRORIST>" triggered "Got_The_Bomb"
11/28/2021 - 21:14:44: "electronic<12><STEAM_1:1:41889689><CT>" money change 800-300 = $500 (tracked) (purchase: weapon_elite)
11/28/2021 - 21:14:44: "electronic<31><STEAM_1:1:41889689><CT>" purchased "elite"
11/28/2021 - 21:14:44: "electronic<12><STEAM_1:1:41889689><CT>" money change 500-300 = $200 (tracked) (purchase: weapon_elite)
11/28/2021 - 21:14:44: "electronic<31><STEAM_1:1:41889689><CT>" purchased "elite"
11/28/2021 - 21:14:45: "electronic<12><STEAM_1:1:41889689><CT>" money change 200-200 = $0 (tracked) (purchase: weapon_flashbang)
11/28/2021 - 21:14:45: "electronic<31><STEAM_1:1:41889689><CT>" picked up "flashbang"
11/28/2021 - 21:14:45: "electronic<31><STEAM_1:1:41889689><CT>" purchased "flashbang"
11/28/2021 - 21:15:20: "s1mple<30><STEAM_1:1:36968273><CT>" picked up "vest"
11/28/2021 - 21:15:20: "s1mple<11><STEAM_1:1:36968273><CT>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:15:20: "s1mple<30><STEAM_1:1:36968273><CT>" purchased "item_kevlar"
11/28/2021 - 21:15:21: "Boombl4<29><STEAM_1:0:92970669><CT>" dropped "hkp2000"
11/28/2021 - 21:15:21: "Boombl4<29><STEAM_1:0:92970669><CT>" picked up "elite"
11/28/2021 - 21:15:23: "Boombl4<29><STEAM_1:0:92970669><CT>" picked up "vest"
11/28/2021 - 21:15:23: "Boombl4<10><STEAM_1:0:92970669><CT>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:15:23: "Boombl4<29><STEAM_1:0:92970669><CT>" purchased "item_kevlar"
11/28/2021 - 21:15:39: [FACEIT] Admin 370f72b0-09d7-428f-a405-e723de152880 unpaused the match
11/28/2021 - 21:15:39: Match pause is disabled - mp_unpause_match
11/28/2021 - 21:15:40: "shox <33><STEAM_1:1:23327283><TERRORIST>" say "hfhfhf"
11/28/2021 - 21:15:43: "b1t<35><STEAM_1:0:143170874><CT>" say "hf"
11/28/2021 - 21:15:43: "b1t<35><STEAM_1:0:143170874><CT>" say_team "5"
11/28/2021 - 21:15:44: "electronic<31><STEAM_1:1:41889689><CT>" say_team "5"
11/28/2021 - 21:15:45: "Perfecto<28><STEAM_1:0:80477379><CT>" say_team "5"
11/28/2021 - 21:15:45: "s1mple<30><STEAM_1:1:36968273><CT>" say_team "5"
11/28/2021 - 21:15:46: "Boombl4<29><STEAM_1:0:92970669><CT>" say_team "5"
11/28/2021 - 21:15:46: "Perfecto<28><STEAM_1:0:80477379><CT>" picked up "vest"
11/28/2021 - 21:15:46: "Perfecto<9><STEAM_1:0:80477379><CT>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:15:46: "Perfecto<28><STEAM_1:0:80477379><CT>" purchased "item_kevlar"
11/28/2021 - 21:15:48: "b1t<35><STEAM_1:0:143170874><CT>" picked up "vest"
11/28/2021 - 21:15:48: "b1t<13><STEAM_1:0:143170874><CT>" money change 800-650 = $150 (tracked) (purchase: item_kevlar)
11/28/2021 - 21:15:48: "b1t<35><STEAM_1:0:143170874><CT>" purchased "item_kevlar"
11/28/2021 - 21:15:53: "Perfecto<28><STEAM_1:0:80477379><CT>" dropped "hkp2000"
11/28/2021 - 21:15:54: "Boombl4<29><STEAM_1:0:92970669><CT>" dropped "elite"
11/28/2021 - 21:15:54: "Perfecto<28><STEAM_1:0:80477379><CT>" picked up "elite"
11/28/2021 - 21:15:55: "Boombl4<29><STEAM_1:0:92970669><CT>" picked up "elite"
11/28/2021 - 21:15:59: Your server needs to be restarted in order to receive the latest update.
11/28/2021 - 21:15:59: World triggered "Round_Start"
11/28/2021 - 21:16:00: "apEX<25><STEAM_1:1:14739219><TERRORIST>" left buyzone with [ weapon_knife_outdoor weapon_glock weapon_flashbang weapon_c4 kevlar(100) C4 ]
11/28/2021 - 21:16:00: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" left buyzone with [ weapon_knife_butterfly weapon_glock kevlar(100) ]
11/28/2021 - 21:16:00: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" left buyzone with [ weapon_knife_flip weapon_p250 kevlar(100) ]
11/28/2021 - 21:16:00: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" left buyzone with [ weapon_knife_butterfly weapon_glock ]
11/28/2021 - 21:16:01: "shox <33><STEAM_1:1:23327283><TERRORIST>" left buyzone with [ weapon_knife_m9_bayonet weapon_p250 kevlar(100) ]
11/28/2021 - 21:16:01: "Boombl4<29><STEAM_1:0:92970669><CT>" left buyzone with [ weapon_knife_survival_bowie weapon_elite kevlar(100) ]
11/28/2021 - 21:16:01: "electronic<31><STEAM_1:1:41889689><CT>" left buyzone with [ weapon_bayonet weapon_usp_silencer weapon_flashbang ]
11/28/2021 - 21:16:01: "Perfecto<28><STEAM_1:0:80477379><CT>" left buyzone with [ weapon_knife_m9_bayonet weapon_elite kevlar(100) ]
11/28/2021 - 21:16:02: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" [-1376 -1085 -417] killed other "func_breakable<458>" [406 -1114 121] with "glock"
11/28/2021 - 21:16:02: "b1t<35><STEAM_1:0:143170874><CT>" left buyzone with [ weapon_knife_karambit weapon_usp_silencer kevlar(100) ]
11/28/2021 - 21:16:02: "s1mple<30><STEAM_1:1:36968273><CT>" left buyzone with [ weapon_knife_outdoor weapon_usp_silencer kevlar(100) ]
11/28/2021 - 21:16:18: "electronic<31><STEAM_1:1:41889689><CT>" dropped "flashbang"
11/28/2021 - 21:16:19: "electronic<31><STEAM_1:1:41889689><CT>" threw flashbang [64 -385 -410] flashbang entindex 458)
11/28/2021 - 21:16:19: "prius<22><STEAM_1:1:17960540><Spectator>" blinded for 4.97 by "electronic<31><STEAM_1:1:41889689><CT>" from flashbang entindex 458
11/28/2021 - 21:16:19: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" blinded for 4.97 by "electronic<31><STEAM_1:1:41889689><CT>" from flashbang entindex 458
11/28/2021 - 21:16:19: "Boombl4<29><STEAM_1:0:92970669><CT>" blinded for 2.00 by "electronic<31><STEAM_1:1:41889689><CT>" from flashbang entindex 458
11/28/2021 - 21:16:19: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" blinded for 4.83 by "electronic<31><STEAM_1:1:41889689><CT>" from flashbang entindex 458
11/28/2021 - 21:16:19: "b1t<35><STEAM_1:0:143170874><CT>" blinded for 0.16 by "electronic<31><STEAM_1:1:41889689><CT>" from flashbang entindex 458
11/28/2021 - 21:16:19: "Boombl4<29><STEAM_1:0:92970669><CT>" [204 -303 -416] attacked "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" [-139 -426 -416] with "elite" (damage "18") (damage_armor "6") (health "82") (armor "93") (hitgroup "left arm")
11/28/2021 - 21:16:19: "Boombl4<29><STEAM_1:0:92970669><CT>" [204 -303 -416] attacked "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" [-194 -441 -416] with "elite" (damage "11") (damage_armor "0") (health "89") (armor "0") (hitgroup "left arm")
11/28/2021 - 21:16:19: "Boombl4<29><STEAM_1:0:92970669><CT>" [218 -336 -416] attacked "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" [-142 -408 -416] with "elite" (damage "127") (damage_armor "0") (health "0") (armor "93") (hitgroup "head")
11/28/2021 - 21:16:19: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" dropped "glock"
11/28/2021 - 21:16:19: "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" dropped "knife"
11/28/2021 - 21:16:19: "Boombl4<29><STEAM_1:0:92970669><CT>" [218 -336 -416] killed "misutaaa<24><STEAM_1:1:60631591><TERRORIST>" [-142 -408 -352] with "elite" (headshot)
11/28/2021 - 21:16:19: "electronic<31><STEAM_1:1:41889689><CT>" flash-assisted killing "misutaaa<24><STEAM_1:1:60631591><TERRORIST>"
11/28/2021 - 21:16:19: "Boombl4<10><STEAM_1:0:92970669><CT>" money change 150+300 = $450 (tracked)
11/28/2021 - 21:16:20: "Boombl4<29><STEAM_1:0:92970669><CT>" [227 -365 -416] attacked "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" [-190 -409 -388] with "elite" (damage "39") (damage_armor "0") (health "50") (armor "0") (hitgroup "stomach")
11/28/2021 - 21:16:20: "Boombl4<29><STEAM_1:0:92970669><CT>" [234 -401 -416] attacked "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" [-189 -392 -365] with "elite" (damage "23") (damage_armor "0") (health "27") (armor "0") (hitgroup "right leg")
11/28/2021 - 21:16:20: "Boombl4<29><STEAM_1:0:92970669><CT>" [237 -448 -416] attacked "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" [-187 -362 -371] with "elite" (damage "31") (damage_armor "0") (health "0") (armor "0") (hitgroup "chest")
11/28/2021 - 21:16:20: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "glock"
11/28/2021 - 21:16:20: "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" dropped "knife"
11/28/2021 - 21:16:20: "Boombl4<29><STEAM_1:0:92970669><CT>" [237 -448 -416] killed "Kyojin<34><STEAM_1:1:22851120><TERRORIST>" [-187 -362 -307] with "elite"
11/28/2021 - 21:16:20: "electronic<31><STEAM_1:1:41889689><CT>" flash-assisted killing "Kyojin<34><STEAM_1:1:22851120><TERRORIST>"
11/28/2021 - 21:16:20: "Boombl4<10><STEAM_1:0:92970669><CT>" money change 450+300 = $750 (tracked)
11/28/2021 - 21:16:24: "s1mple<30><STEAM_1:1:36968273><CT>" [1426 -1220 -416] attacked "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" [685 -2012 -416] with "hkp2000" (damage "14") (damage_armor "7") (health "86") (armor "92") (hitgroup "chest")
11/28/2021 - 21:16:31: "s1mple<30><STEAM_1:1:36968273><CT>" [1279 -861 -408] attacked "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" [1167 -2441 -416] with "hkp2000" (damage "104") (damage_armor "0") (health "0") (armor "92") (hitgroup "head")
11/28/2021 - 21:16:31: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" dropped "p250"
11/28/2021 - 21:16:31: "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" dropped "knife"
11/28/2021 - 21:16:31: "s1mple<30><STEAM_1:1:36968273><CT>" [1279 -861 -408] killed "ZywOo<26><STEAM_1:1:76700232><TERRORIST>" [1167 -2441 -352] with "usp_silencer" (headshot)
11/28/2021 - 21:16:31: "s1mple<11><STEAM_1:1:36968273><CT>" money change 150+300 = $450 (tracked)
11/28/2021 - 21:16:31: "Perfecto<28><STEAM_1:0:80477379><CT>" [716 -503 -411] attacked "apEX<25><STEAM_1:1:14739219><TERRORIST>" [401 -883 -392] with "elite" (damage "121") (damage_armor "0") (health "0") (armor "100") (hitgroup "head")
11/28/2021 - 21:16:31: "apEX<25><STEAM_1:1:14739219><TERRORIST>" triggered "Dropped_The_Bomb"
11/28/2021 - 21:16:31: "apEX<25><STEAM_1:1:14739219><TERRORIST>" dropped "c4"
11/28/2021 - 21:16:31: "apEX<25><STEAM_1:1:14739219><TERRORIST>" dropped "glock"
11/28/2021 - 21:16:31: "apEX<25><STEAM_1:1:14739219><TERRORIST>" dropped "flashbang"
11/28/2021 - 21:16:31: "apEX<25><STEAM_1:1:14739219><TERRORIST>" dropped "knife"
11/28/2021 - 21:16:31: "Perfecto<28><STEAM_1:0:80477379><CT>" [716 -503 -411] killed "apEX<25><STEAM_1:1:14739219><TERRORIST>" [401 -883 -328] with "elite" (headshot)
11/28/2021 - 21:16:31: "Perfecto<9><STEAM_1:0:80477379><CT>" money change 150+300 = $450 (tracked)
11/28/2021 - 21:16:37: "s1mple<30><STEAM_1:1:36968273><CT>" [1024 -400 -128] killed other "prop_dynamic<213>" [448 -1403 -416] with "usp_silencer"
11/28/2021 - 21:16:39: "electronic<31><STEAM_1:1:41889689><CT>" [903 -686 -640] killed other "func_breakable<209>" [1040 -560 -560] with "usp_silencer"
11/28/2021 - 21:16:42: "electronic<31><STEAM_1:1:41889689><CT>" [693 -713 -768] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [1081 -554 -595] with "hkp2000" (damage "16") (damage_armor "7") (health "84") (armor "92") (hitgroup "chest")
11/28/2021 - 21:16:42: "electronic<31><STEAM_1:1:41889689><CT>" [692 -715 -768] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [1063 -552 -598] with "hkp2000" (damage "16") (damage_armor "7") (health "68") (armor "84") (hitgroup "chest")
11/28/2021 - 21:16:42: "electronic<31><STEAM_1:1:41889689><CT>" [719 -696 -768] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [1065 -558 -599] with "hkp2000" (damage "16") (damage_armor "8") (health "52") (armor "75") (hitgroup "right arm")
11/28/2021 - 21:16:42: "shox <33><STEAM_1:1:23327283><TERRORIST>" [1067 -559 -600] attacked "electronic<31><STEAM_1:1:41889689><CT>" [713 -696 -768] with "p250" (damage "34") (damage_armor "0") (health "66") (armor "0") (hitgroup "chest")
11/28/2021 - 21:16:44: "electronic<31><STEAM_1:1:41889689><CT>" [766 -685 -768] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [1022 -562 -598] with "hkp2000" (damage "16") (damage_armor "8") (health "36") (armor "66") (hitgroup "chest")
11/28/2021 - 21:16:44: "electronic<31><STEAM_1:1:41889689><CT>" [768 -688 -768] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [996 -545 -596] with "hkp2000" (damage "16") (damage_armor "8") (health "20") (armor "57") (hitgroup "chest")
11/28/2021 - 21:16:44: "b1t<35><STEAM_1:0:143170874><CT>" [820 -15 -640] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [993 -543 -599] with "hkp2000" (damage "15") (damage_armor "7") (health "5") (armor "49") (hitgroup "chest")
11/28/2021 - 21:16:44: "b1t<35><STEAM_1:0:143170874><CT>" [819 -17 -640] attacked "shox <33><STEAM_1:1:23327283><TERRORIST>" [968 -516 -640] with "hkp2000" (damage "16") (damage_armor "7") (health "0") (armor "41") (hitgroup "right arm")
11/28/2021 - 21:16:44: "shox <33><STEAM_1:1:23327283><TERRORIST>" dropped "p250"
11/28/2021 - 21:16:44: "shox <33><STEAM_1:1:23327283><TERRORIST>" dropped "knife"
11/28/2021 - 21:16:44: "b1t<35><STEAM_1:0:143170874><CT>" [819 -17 -640] killed "shox <33><STEAM_1:1:23327283><TERRORIST>" [968 -516 -576] with "usp_silencer"
11/28/2021 - 21:16:44: "electronic<31><STEAM_1:1:41889689><CT>" assisted killing "shox <33><STEAM_1:1:23327283><TERRORIST>"
11/28/2021 - 21:16:44: "b1t<13><STEAM_1:0:143170874><CT>" money change 150+300 = $450 (tracked)
11/28/2021 - 21:16:44: Team "CT" triggered "SFUI_Notice_CTs_Win" (CT "5") (T "11")
11/28/2021 - 21:16:44: Team "CT" scored "5" with "5" players
11/28/2021 - 21:16:44: Team "TERRORIST" scored "11" with "5" players
11/28/2021 - 21:16:44: MatchStatus: Team playing "CT": NAVI GGBET
11/28/2021 - 21:16:44: MatchStatus: Team playing "TERRORIST": TeamVitality
11/28/2021 - 21:16:44: MatchStatus: Score: 5:11 on map "de_nuke" RoundsPlayed: 16
11/28/2021 - 21:16:44: World triggered "Round_End"
`;

describe("determineRoundTeams", () => {
  it('uses the last Team playing ".*" instance', () => {
    const roles = determineRoundTeams(theBadRound.split("\n"));

    expect(roles).toEqual({
      T: "TeamVitality",
      CT: "NAVI GGBET",
    });
  });
});
