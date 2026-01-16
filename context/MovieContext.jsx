
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("All");
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Dynamic dropdown arrays
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/movies/all");
        if (data.success) {
          setAllMovies(data.movies);
          setMovies(data.movies);

        
          const uniqueLangs = ["All", ...new Set(data.movies.map((m) => m.language))];
          const uniqueGenres = ["All", ...new Set(data.movies.map((m) => m.genre))];

          setLanguages(uniqueLangs);
          setGenres(uniqueGenres);
        }
      } catch (err) {
        console.error("Movie Fetch Error:", err);
      }
    };
    fetchMovies();
  }, []);



useEffect(() => {
  console.log("Typing... Current Input:", search);
  const handler = setTimeout(() => {
    console.log("--- Logic Executed for:", search + " ---");
    setDebouncedSearch(search);
  }, 500);

  return () => {
    console.log("Timer Cleaned (User is still typing...)");
    clearTimeout(handler);
  };
}, [search]);
  
  useEffect(() => {
    let filtered = allMovies;
    if (language !== "All") filtered = filtered.filter((m) => m.language === language);
    if (genre !== "All") filtered = filtered.filter((m) => m.genre === genre);

   if (debouncedSearch.trim() !== "") {
    const query = debouncedSearch.toLowerCase();
    
    filtered = filtered.filter((m) =>
      m.title.toLowerCase().includes(query) || 
      m.language.toLowerCase().includes(query) || 
      m.genre.toLowerCase().includes(query)
    );
  }

    setMovies(filtered);
  }, [language, genre,debouncedSearch, allMovies]);

  return (
    <MovieContext.Provider value={{ 
      movies, language, setLanguage, genre, setGenre, 
      languages, genres ,search,setSearch
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);