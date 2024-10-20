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

### 5. Link-uri

Linkurile acestui proiect sunt impartite in doua categorii:

-   linkuri publice:
    -   sunt folosite de clientii cu care artistul imparateste site-ul
    -   nu necesita autentificare
-   linkuri private:
    -   incep cu /admin
    -   sunt folosite doar de artistul care foloseste platforma
    -   in afara de `/admin/autentificare` si `/admin/inregistrare`, necesita sa fi autentificat pentru a le accesa

| Link                        | Tip    | Descriere                               |
| --------------------------- | ------ | --------------------------------------- |
| /                           | Public | Vizualizare proiecte active             |
| /admin                      | Privat | Vizualizare proiecte active si inactive |
| /admin/proiect/(id-proiect) | Privat | Editare proiect cu id-ul dat            |
| /admin/adauga-proiect       | Privat | Creare proiect                          |
| /admin/autentificare        | Privat | Autentificare artist                    |
| /admin/inregistrare         | Privat | Inregistrare artist                     |

## Bine de stiut

Aceasta platforma este conceputa pentru un singur artist.

Daca mai multi isi fac cont, proiectele adaugate vor putea fi vauzte, editate si sterse si de ceilalti artisti.

Asta poate duce la vulenrabilitati, cum ar fi crearea neautorizata de conturi de care vor putea sterge datele artisului.

De accea, pagina de inregistrare accepta o parola de tip master, care nu va permite crearea de cont de catre oricine.

Serverul va fi responsabil cu setarea si verificarea acestei parole. Urmeaza instructiuniile din [repository-ul acestuia](https://github.com/ginoburdea/nestjs-react--server) pentru a afla cum sa o setezi.
