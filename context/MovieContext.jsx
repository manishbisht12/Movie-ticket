// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const MovieContext = createContext();

// export const MovieProvider = ({ children }) => {
//   const [allMovies, setAllMovies] = useState([]); // Database se aayi movies
//   const [movies, setMovies] = useState([]);      // Filtered movies
//   const [language, setLanguage] = useState("All");
//   const [genre, setGenre] = useState("All");

//   // API se movies fetch karna
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/movies/all");
//         if (data.success) {
//           setAllMovies(data.movies);
//           setMovies(data.movies);
//         }
//       } catch (err) {
//         console.error("Movie Fetch Error:", err);
//       }
//     };
//     fetchMovies();
//   }, []);

//   // Filtering Logic
//   useEffect(() => {
//     let filtered = allMovies;
//     if (language !== "All") {
//       filtered = filtered.filter((m) => m.language === language);
//     }
//     if (genre !== "All") {
//       filtered = filtered.filter((m) => m.genre === genre);
//     }
//     setMovies(filtered);
//   }, [language, genre, allMovies]);

//   return (
//     <MovieContext.Provider value={{ movies, language, setLanguage, genre, setGenre }}>
//       {children}
//     </MovieContext.Provider>
//   );
// };

// export const useMovies = () => useContext(MovieContext);

"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("All");
  const [genre, setGenre] = useState("All");

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
    let filtered = allMovies;
    if (language !== "All") filtered = filtered.filter((m) => m.language === language);
    if (genre !== "All") filtered = filtered.filter((m) => m.genre === genre);
    setMovies(filtered);
  }, [language, genre, allMovies]);

  return (
    <MovieContext.Provider value={{ 
      movies, language, setLanguage, genre, setGenre, 
      languages, genres 
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);