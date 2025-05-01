# Itinerario Barcellona 3–6 Maggio 2025 – WebApp

Web‑app statica (HTML/CSS/JS) per consultare facilmente il programma di viaggio di **4 giorni a Barcellona**.

## Anteprima rapida
![screenshot](https://user-images.githubusercontent.com/000000/placeholder.png)

## Struttura
```
.
├── index.html          # pagina principale
├── style.css           # piccoli ritocchi di stile
├── script.js           # (vuoto) spazio per JS extra
├── .github/workflows/  # CI: deploy automatico su GitHub Pages
└── README.md           # questa guida
```

## Come usarla in locale
1. Clona la repo  
   ```bash
   git clone https://github.com/<tuo‑utente>/<repo>.git
   cd <repo>
   ```
2. Apri `index.html` nel browser.

## Pubblicazione su GitHub Pages

La repo include già un **workflow GitHub Actions** che:
* si attiva a ogni push su `main`
* carica i file statici sul branch **gh‑pages**
* abilita automaticamente *GitHub Pages* (build via Actions)

Passaggi:
1. Vai in **Settings › Pages** della tua repository.
2. Scegli **Build and deployment: GitHub Actions** (se non è già attivo).
3. Salva: dopo il prossimo push, il sito sarà disponibile su  
   `https://<tuo‑utente>.github.io/<repo>/`.

## Personalizzazioni possibili
* Aggiungi link diretti a biglietterie online, mappe interattive, immagini.
* Trasforma l’app in una **PWA** con un semplice *service‑worker*.
* Localizzazione EN/ES con un toggle e file `lang/*.json`.
* Se preferisci una struttura /docs, sposta i file e aggiorna il workflow.

## Licenza
Distribuito con licenza MIT. Vedi [`LICENSE`](LICENSE).
