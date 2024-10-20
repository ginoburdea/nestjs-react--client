# NestJS React - Client

O platforma web prin care artistii isi pot construi un site de tip portofoliu:

-   Adauga, editeaza, sterg, seteaza proiecte ca ascunse (inactive)
-   Impartasesc cu clientii proiectele vizibile (active)

## Instrutiuni de utilizare

### 1. Cerinte sistem

Pentru a utliza acest proiect, trebuie sa ai instalate:

-   [NodeJS si NPM](https://nodejs.org/en/download/package-manager)
-   [git](https://git-scm.com/downloads)

### 2. Descarcare proiect

Deschide un terminal / command prompt si tasteaza urmatoarele comenzi:

```sh
git clone https://github.com/ginoburdea/nestjs-react--client.git
cd nestjs-react--client
npm install
```

### 3. Variabile de environment

Copiaza fisierul `.env.example` si pune-i numele `.env.local` (Acest fisier va fi ignorat de git cand un commit este creat)

Deschide noul fisier si inlocuieste variabilele in functie de instructiunie din acesta.

### 4. Comenzi

In functie de obiectivul tau, foloseste una dintre urmatoarele comenzi:

```sh
# Deschidere in modul de dezvoltare (pentru modificari locale si pentru a vedea schimbarile in timp real)
npm run dev

# Creaza fisiere de tip "build" ce urmeaza a fi folosite in modul de productie (trebuie folosite cu un server static: nginx, caddy, ngrok, etc)
npm run build

# Vizualizare fiserele de tip "build" (pentru verificarea acestora, nu pentru productie! Foloseste un server mentionat mai sus pentru productie)
npm start

# Lint fisisere (aplicarea regulilor eslint pentru o calitate imbunatatia a codului)
npm run lint
```
