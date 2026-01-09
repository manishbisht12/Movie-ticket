"use client";
import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

const moviesData = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Action",
    language: "English",
    rating: "8.4",
    poster: "/images/movies/avengers.jpg",
  },
  {
    id: 2,
    title: "Batman",
    genre: "Action",
    language: "English",
    rating: "8.1",
    poster: "/images/movies/batman.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    language: "English",
    rating: "8.6",
    poster: "/images/movies/interstellar.jpg",
  },
  {
    id: 4,
    title: "Inception",
    genre: "Thriller",
    language: "English",
    rating: "8.8",
    poster: "/images/movies/inception.jpg",
  },

  // 🔴 Hindi Movies
  {
    id: 5,
    title: "Jawan",
    genre: "Action",
    language: "Hindi",
    rating: "7.9",
    poster: "/images/movies/jawan.jpg",
  },
  {
    id: 6,
    title: "Pathaan",
    genre: "Action",
    language: "Hindi",
    rating: "7.2",
    poster: "/images/movies/pathaan.jpg",
  },
  {
    id: 7,
    title: "Drishyam",
    genre: "Thriller",
    language: "Hindi",
    rating: "8.3",
    poster: "/images/movies/drishyam.jpg",
  },
  {
    id: 8,
    title: "3 Idiots",
    genre: "Comedy",
    language: "Hindi",
    rating: "8.4",
    poster: "/images/movies/3idiots.jpg",
  },

  // 🔵 South Indian Movies
  {
    id: 9,
    title: "RRR",
    genre: "Action",
    language: "Tamil",
    rating: "8.2",
    poster: "/images/movies/rrr.jpg",
  },
  {
    id: 10,
    title: "Baahubali",
    genre: "Action",
    language: "Telugu",
    rating: "8.0",
    poster: "/images/movies/baahubali.jpg",
  },
  {
    id: 11,
    title: "KGF Chapter 2",
    genre: "Action",
    language: "Kannada",
    rating: "8.3",
    poster: "/images/movies/kgf2.jpg",
  },
  {
    id: 12,
    title: "Vikram",
    genre: "Thriller",
    language: "Tamil",
    rating: "8.4",
    poster: "/images/movies/vikram.jpg",
  },

  // 🟢 Marathi Movies
  {
    id: 13,
    title: "Sairat",
    genre: "Romantic",
    language: "Marathi",
    rating: "8.1",
    poster: "/images/movies/sairat.jpg",
  },
  {
    id: 14,
    title: "Natsamrat",
    genre: "Drama",
    language: "Marathi",
    rating: "8.7",
    poster: "/images/movies/natsamrat.jpg",
  },

  // 🟣 Extra Variety
  {
    id: 15,
    title: "Joker",
    genre: "Drama",
    language: "English",
    rating: "8.5",
    poster: "/images/movies/joker.jpg",
  },
  {
    id: 16,
    title: "Parasite",
    genre: "Thriller",
    language: "Korean",
    rating: "8.6",
    poster: "/images/movies/parasite.jpg",
  },
];


export function MovieProvider({ children }) {
  const [language, setLanguage] = useState("All");
  const [genre, setGenre] = useState("All");

  const movies = moviesData.filter(
    (m) =>
      (language === "All" || m.language === language) &&
      (genre === "All" || m.genre === genre)
  );

  return (
    <MovieContext.Provider
      value={{ movies, language, setLanguage, genre, setGenre }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);
