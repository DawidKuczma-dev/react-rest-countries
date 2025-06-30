# 🌍 Country Explorer App

Aplikacja React, która pobiera dane o krajach z publicznego API [REST Countries](https://restcountries.com) i wyświetla je w przejrzystej formie. Pozwala na filtrowanie, sortowanie, wyszukiwanie i sprawdzanie szczegółowych informacji o każdym kraju w tym także pogody i czasu lokalnego dzięki [OpenWeather](https://openweathermap.org)

## 🔗 Demo

👉 [Zobacz na żywo](https://dawidkuczma-dev.github.io/react-rest-countries/)

## 📸 Screenshots

<p align="center">
  <img src="public/screenshots/screenshot-mobile.png" width="342" alt="Mobile" />
  <img src="public/screenshots/screenshot-tablet.png" width="458" alt="Tablet" />
  <img src="public/screenshots/screenshot-desktop.png" width="800" alt="Desktop" />
</p>


## ⚙️ Technologie

- React + Vite
- React Router
- CSS (grid, flexbox, media queries)
- REST API (fetch)
- GitHub Pages (hostowanie)

## 📁 Struktura folderów

```bash
📁 Country Explorer App
├── 📁 public
|   ├── index.html
|   ├── favicon.png
|   └── 📁 screenshots
├── 📁 src
|   ├── 📁 components
|   │   ├── 📁 [Komponent1]
|   │   |   ├── Komponent1.css
|   │   |   └── Komponent1.jsx
|   │   ├── 📁 [Komponent2]
|   │   |   ├── Komponent2.css
|   │   |   └── Komponent2.jsx
|   │   ...
|   ├── 📁 pages
|   │   ├── 📁 CountryDetails
|   │   |   ├── CountryDetails.css
|   │   |   └── CountryDetails.jsx
|   │   └── 📁 Home
|   │       ├── Home.css
|   │       └── Home.jsx
|   ├── App.jsx
|   ├── index.css
|   ├── main.jsx
|   └── reset.css
├── index.html
├── README.md
└── ... 

📁 components – każdy komponent znajduje się w osobnym folderze z plikiem JSX i odpowiadającym mu plikiem CSS
📁 pages – głowne widoki (strony) 
🗒️ App.jsx – głowny komponent aplikacji  
🗒️ main.jsx – punkt wejściowy aplikacji

```

## ✨ Funkcje

- Wyszukiwanie państw po nazwie lub stolicy
- Filtrowanie państw według kontynentu
- Sortowanie państw
- Funkcja **losowego państwa**
- Podgląd szczegółów każdego państwa
- Wyświetlanie **aktualnej pogody w stolicy** (dane z OpenWeather)
- Pokazywanie **lokalnego czasu w stolicy** na podstawie strefy czasowej z OpenWeather
- Link do map Google i OpenStreetMap
- Responsywny interfejs (mobile/tablet/desktop)
- Obsługa przypadków braku danych

## 🧠 Czego się nauczyłem

- Korzystanie z Vite do tworzenia nowoczesnych aplikacji React
- Integracji dwóch API w jednej aplikacji (REST Countries i OpenWeather)
- Pracy API – pobieranie, filtrowanie i przetwarzanie danych
- Tworzenia wielu komponentów i zarządzania stanem aplikacji
- Używania React Router do obsługi nawigacji i dynamicznych ścieżek
- Stylowania komponentów z wykorzystaniem CSS (Grid, Flexbox, Media Queries)
- Obsługi przypadków brzegowych (np. brak stolicy, brak granic, brak waluty)
- Dodawania sortowania wyników w React
- Implementacji funkcji losowego wyboru elementu i przekierowania do strony szczegółów
- Pracy z czasem lokalnym na podstawie danych o strefie czasowej

## 🚀 Uruchomienie lokalne

1. Sklonuj repozytorium  
```bash
git clone https://github.com/DawidKuczma-dev/react-rest-countries.git
cd react-rest-countries
npm install
npm run dev
```

## 📇 Autor

Dawid Kuczma  
[LinkedIn](https://www.linkedin.com/in/dawid-kuczma-a60836369/) • [GitHub](https://github.com/DawidKuczma-dev)

## 📝 Licencja

Ten projekt jest dostępny na zasadach licencji MIT.






