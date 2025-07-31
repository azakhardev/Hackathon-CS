<p align="center">
  <img width="250" height="250" src="https://i.imgur.com/U4OIRFQ.png">
</p>

## Welcome

to [Loop](https://github.com/Edems-DEV/Hackathon-CS) repository. This repo hosts the frontend application built in raw React for Česká spořitelna's internal tooling, developed during the 2024 Hackathon. 

## Setup
- `npm install`
- `npm run dev`

## Preview
![mockup](https://i.imgur.com/ogTTOQt.png)

# Loop – Hackathon Česká spořitelna 2024

**Loop** je frontendová aplikace vytvořená během dvoutýdenního hackathonu pořádaného Českou spořitelnou v roce 2024.  
Cílem bylo navrhnout intuitivní nástroj pro práci s DevOps daty, umožňující jejich přehledné zobrazení, filtrování a analýzu.

## 👥 Tým

Projekt vznikl ve čtyřčlenném týmu:

- **Artem (já)** – vedoucí týmu, zodpovědný za organizaci práce, tvorbu grafů, tabulek a napojení na API.
- **Adam** – hlavní designér, stojí za vzhledem celé aplikace.
- **Dominik & Michael** – implementace endpointů, filtrů, překladu a částečně i UI prvků.

> Pro mě i Adama šlo o první větší zkušenost s Reactem. Dominik s Michaelem už měli praxi s Next.js.

## 🧰 Použité technologie

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [react-i18next](https://react.i18next.com/)

## 🎨 Design

Použili jsme knihovnu **ShadCN**, která nám umožnila vytvořit elegantní a jednoduché UI – inputy, přepínače režimů (světlý/tmavý) a další komponenty.  
Většinu komponent jsme přizpůsobili pomocí vlastních wrapperů, aby byly snadno znovupoužitelné.

## 📊 Grafy

Grafy jsem implementoval pomocí přizpůsobených komponent z ShadCN. Každá komponenta je vysoce konfigurovatelná pomocí `props` – umožňuje rychlou změnu typu či vstupních dat.  
Data se vykreslují genericky podle zadaného formátu a doprovází je plynulé animace.

## 🔍 TanStack Query

Pro komunikaci s API jsme použili knihovnu **TanStack Query**, která:

- umožňuje **caching** dat,
- podporuje **dynamické načítání** přes `useInfiniteQuery`,
- snižuje zátěž na frontend (většina filtrování probíhá na backendu).

## 🌐 Překlad

Aplikace je vícejazyčná – využívá knihovnu `react-i18next`. Překlady jsou ukládány v `.json` souborech a určují se dynamicky podle zvoleného jazyka.

## 🔐 Autentizace

Autentizace probíhá přes **Basic Auth**, což byla jediná možnost podporovaná API. Přihlašovací údaje jsou ukládány do `sessionStorage` (pro účely dema).

## 🧪 API & práce s daty

Práce s API byla jedna z nejsložitějších částí - jednalo se o CI/CD data, poskytnutá Českou Spořitelnou. Museli jsme:

- pochopit strukturu dat a jejich vazby,
- několikrát upravit modely pro načítání,
- vyřešit problémy s filtry (někdy vracely špatná data nebo měly nejasné výchozí hodnoty).

Jediná část, kde dochází k filtrování na klientu, je **stránka projektů**, kvůli:

- seřazení podle oblíbenosti,
- zobrazení posledního jobu u každého projektu.

## 🔧 Filtry

Po zvládnutí logiky backendových filtrů jsme je integrovali do aplikace. Díky ShadCN bylo snadné vytvořit hezké UI pro vstupy.

Navíc jsme implementovali **ukládání filtrů do URL parametrů**, takže je možné sdílet konkrétní pohled s kolegy pouhým odkazem.

## 📉 Výsledek hackathonu

Z celkem 7 týmů jsme se bohužel nedostali do TOP 3.  
Důvodem bylo, že klíčovým hodnoticím kritériem byla schopnost **„prodat“ aplikaci**, nikoliv jen technické řešení – což jsme předem netušili.  
I tak si myslíme, že bychom si zasloužili **3. nebo 4. místo**.
