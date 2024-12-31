# Interaktiv Julekalender

## Oversikt
Dette prosjektet er en interaktiv julekalender som lar brukere klikke på datoer (1-24) for å åpne en "luke" som inneholder en tilfeldig julefakta eller vits. Kalenderen er designet med et festlig tema og inkluderer funksjoner for brukerinteraksjon.

## Prosjektstruktur
```
christmas-calendar
├── index.html       # HTML-struktur for kalenderen
├── styles.css       # CSS-stiler for kalenderen
├── script.js        # JavaScript-logikk for interaktivitet
└── README.md        # Prosjektdokumentasjon
```

## Funksjoner
- 5x5 grid-layout som representerer dagene i desember frem til jul.
- Hver celle viser et nummer fra 1 til 24.
- Klikking på en dato henter en tilfeldig vits eller fakta fra et API.
- Når en dato er åpnet, kan den ikke åpnes igjen.
- Tilbakestillingsknapp for å la brukere starte på nytt.
- Brukere kan legge til sine egne julemeldinger for en hvilken som helst dato.
- Lydavspilling når en luke åpnes.
- Try-catch blokker er lagt til for å håndtere feil.