# Review: "Prečo táto stránka vôbec existuje?"

**Dátum revízie:** 2026-07-04
**Cieľový súbor:** `src/posts/2026-07-04-preco-tato-stranka-vobec-existuje.md`
**Stav:** draft (koncept), obsah stále rozpracovaný

Toto je "shadow" súbor — nie je súčasťou buildovanej stránky (leží mimo
`src/`), slúži len ako záznam recenzie ku konkrétnej verzii článku nižšie.

## Snapshot článku v čase revízie

```markdown
---
title: Prečo táto stránka vôbec existuje?
date: 2026-07-04
draft: true
---

## Ako to celé začalo

Nápad na túto stránku prišiel na rozlúčke so slobodou. Už predtým som sa
rozhodol, že by som niekedy chcel začať verejnejšie rozprávať o svojom
príbehu s depresiou.

Keď som na tej rozlúčke už tretíkrát opakoval ten istý príbeh a ráno som
nemal čo robiť, kým všetci ešte spali, tak som si kúpil doménu a Claude
vytvoril stránku.

A tu sme!

## Kto som?

Kamaráti ma poznajú, tak im som toto intro hovoriť nemusel, ale tu ho
spomeniem. Kto teda som? Som depresívny Gabo. 32-ročný programátor, otec
dvoch detí – Kubko (5r) a Lucka (3r) – a proste pomerne obyčajný týpek. A
nejak sa teda stalo, že (vraj<span class="asterisk">*</span>) mám depresiu.

<p class="intro-note">
  <span class="asterisk">*</span> „vraj“ pretože s tým ešte stále nie som
  stotožnený a diagnostika depresie žiaľ nie je úplne presná.
</p>

## Čo to znamená?

Znamená to, že som si asi pred tromi rokmi uvedomil, že ma nejak nebaví
život a že všetko nejak nedávam. Rodina, práca, rodina, práca, rodina,
práca – a teda málo času na seba, manželku, kamarátov a tak všeobecne. A
tak som sa nejak rozhodol, že by som s tým asi mal niečo robiť. Tak som
začal chodiť na terapiu.

Tam som chodil tak tri mesiace pravidelne – raz týždenne, prípadne raz za
dva týždne. A bolo to fajn. Potom som si dal na nejaký čas prestávku,
potom som zas išiel zopárkrát, a zase prestávka, a zase som išiel, a tak.

Takto prebehol rok a uvedomil som si, že sa stále necítim dobre,
respektíve, že sa cítim dosť zle. A tak som si povedal, že skúsim ísť k
psychiatričke. Samozrejme, to nebolo len tak – robil som si okolo toho
research, radil som sa s Claude-om (🙈), googlil som, čítal som,
konzultoval som s manželkou aj s terapeutkou a podobne. A tak som išiel.

Aj napriek researchu som netušil, čo presne ma u psychiatričky čaká.
Nevedel som, či sa robia nejaké testy, alebo či sa proste iba
porozprávame, alebo čo. A pani doktorka sa ma teda pýtala nejaké otázky
(už si nepamätám presne aké).

_(Toto rozprávanie ešte doplním nabudúce.)_

## Ten príbeh, ktorý som opakoval

Takže ako znel ten príbeh, ktorý som opakoval? Dva roky – od júna 2024 –
beriem antidepresíva.

_(Aj toto ešte doplním nabudúce.)_

## Kto to vie

V zásade som sa vôbec neotvoril o tom, že mám depresiu. Zopár kamarátov
to už vedelo. Sestra to vie už dlhšie. Bratovi a rodičom som to povedal
iba nedávno.
```

## Poznámky k úpravám pri prepise (over pôvodným textom bez diakritiky)

- ~~"V zásade som sa vôbec otvoril..." → "...vôbec neotvoril..."~~ — **zrušené.**
  Pridal som zápor "ne" na základe vlastnej interpretácie kontextu, čo bolo
  nesprávne — autor potvrdil, že pôvodné znenie bez zápornej väzby bolo
  zámerné. Vrátené na pôvodné "vôbec otvoril" bez zmeny významu.
- Dve vety, čo sa v poznámkach zjavne zaseknú uprostred myšlienky
  ("...a neja [will continue later]" a "...beriem antidepresíva. Od
  približne"), som odstrihol na prirodzenom mieste vety a doplnil kurzívou
  značku, že pokračovanie príde neskôr — namiesto publikovania
  nedokončenej vety.
- Asterisk-poznámka ("vraj*") je skopírovaná zo štruktúry na `index.njk`
  (rovnaké CSS triedy `asterisk` a `intro-note`), aby vyzerala a správala sa
  rovnako ako na hlavnej stránke.

## Obsahové/redakčné postrehy (na zváženie, nič som nemenil)

1. **Nekonzistentné mená detí** — "Kubko" a "Lucka" bez dĺžňa/mäkčeňa oproti
   ostatnému textu s diakritikou (možno zámerne ako prezývky, možno má byť
   "Lucka" → "Lucka" ostáva rovnaké, ale over, či nechceš "Kubko" a "Lucka"
   inak — obe pôsobia ako škôlkarske skratky mena, čo je asi zámer).
2. **Dva nedokončené odseky v jednom článku** — momentálne sú tam dve
   miesta s "doplním nabudúce". Čitateľovi to môže pôsobiť trochu
   nedokončene ak narazí na oba naraz. Vzhľadom na to, že článok má
   `draft: true` a homepage zobrazuje "koncept" badge, toto je v poriadku
   pre teraz — ale keď dopíšeš zvyšok, obe kurzívové poznámky treba
   odstrániť.
3. **Časová os** — článok spomína "asi pred tromi rokmi" (terapia) a "od
   júna 2024" (antidepresíva, t. j. presne datovane). Keď dopíšeš zvyšok
   príbehu, možno bude fajn ujednotiť mieru presnosti (buď všade približne,
   alebo všade s dátumami), nech to pôsobí súdržne.
4. **Nadpisy** — "Kto som?", "Čo to znamená?", "Ten príbeh, ktorý som
   opakoval", "Kto to vie" — sú funkčné a jasné. Jediné čo zvážiť: "Čo to
   znamená?" nadväzuje priamo na predchádzajúcu vetu s "(vraj*)", takže je
   čitateľovi jasné na čo sa pýta — v poriadku.
5. Gramatika/preklepy inak vyzerajú v poriadku po oprave diakritiky; nič
   iné výrazne nekríči.
