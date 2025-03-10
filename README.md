# Quran LeseHack

Eine moderne Quran-Lernapp, mit der du den Quran in 28 Lektionen lernen kannst, basierend auf den 28 arabischen Buchstaben.

## Technologie-Stack

- **Frontend**: Next.js 15, React, TypeScript
- **UI-Komponenten**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **State Management**: React Hooks, nuqs für URL-Parameter
- **Deployment**: Vercel (geplant)

## Features

- 28 Lektionen, die auf den 28 arabischen Buchstaben basieren
- Interaktive Übungen und Quizze
- Fortschrittsverfolgung
- Hasanat-Belohnungssystem
- Highscores und Ranglisten
- Benutzerprofile

## Entwicklung

### Voraussetzungen

- Node.js 18.17 oder höher
- npm 9.6.7 oder höher

### Installation

1. Repository klonen
   ```bash
   git clone https://github.com/username/quran-lesehack.git
   cd quran-lesehack
   ```

2. Abhängigkeiten installieren
   ```bash
   npm install
   ```

3. Entwicklungsserver starten
   ```bash
   npm run dev
   ```

4. Öffne [http://localhost:3000](http://localhost:3000) im Browser

### Build

```bash
npm run build
```

### Start

```bash
npm run start
```

## Projektstruktur

```
src/
├── app/                  # Next.js App Router
│   ├── lektionen/        # Lektionen-Seiten
│   ├── fortschritt/      # Fortschritt-Seite
│   ├── highscores/       # Highscores-Seite
│   ├── profil/           # Profil-Seite
│   ├── hilfe/            # Hilfe-Seite
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Homepage
├── components/           # React-Komponenten
│   ├── ui/               # UI-Komponenten (Shadcn)
│   ├── main-nav.tsx      # Hauptnavigation
│   └── lightbox.tsx      # Lightbox-Komponente
├── lib/                  # Hilfsfunktionen und Utilities
└── styles/               # Globale Styles
```

## Lizenz

Alle Rechte vorbehalten © Deen Akademie
