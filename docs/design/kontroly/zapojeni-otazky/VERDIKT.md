# Kontrola 18. 11. 2026: zapojení (obrázkové a blokové schéma), spotřebiče, časté otázky

Screenshoty 360 a 1280 px, světlý i tmavý režim, dev server. Automatická kontrola (přetečení, písmo pod 15 px včetně textu v SVG, kontrast, dotykové cíle) bez nálezů.

- **/cs/zapojeni/ – SCHVÁLENO po opravě.** Opraveno: název baterie (2 × … paralelně) a zdroje 230 V (elektrocentrála) se po přepnutí neobnovoval (chyběl v závislostech useMemo, `PruvodceZapojenim.tsx`); tabulka kabelů blokového schématu na mobilu neměla popisky sloupců (`BlokoveSchema.tsx`, data-label). Poznámky: se dvěma bateriemi a elektrocentrálou je obrázkové schéma širší (1562 px) i na 1280 px a posouvá se; pod obrázkovým schématem zůstává asi 250 px prázdné plochy.
- **/cs/kalkulacka-spotrebicu/ – SCHVÁLENO.** Poznámky: výběr „Co běží pořád“ je bez zástupné volby (prázdné pole); karty sezón ve výsledku jsou na 360 px pod sebou (dlouhé).
- **/cs/otazky/ – SCHVÁLENO po opravě.** Opraveno (`otazky.astro`): při hledání zůstávaly prázdné nadpisy témat (display: grid přebil hidden); otázky neměly znak rozbalení (přidána šipka, při omezeném pohybu bez animace); pole hledání bylo na desktopu úzké. Poznámky (texty): upozornění nahoře mluví o „kalkulačce“; nápověda „70 otázek“ neukazuje počet nalezených.
