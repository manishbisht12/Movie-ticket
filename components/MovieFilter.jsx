// "use client";
// import { useMovies } from "@/context/MovieContext";

// export default function MovieFilter() {
//   const { language, setLanguage, genre, setGenre } = useMovies();

//   return (
//     <div className="flex gap-4 mb-8">
//       {/* Language */}
//       <select
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         className="bg-black text-white border border-white/20 px-4 py-2 rounded-md"
//       >
//         <option className="bg-black text-white" value="All">All Languages</option>
//         <option className="bg-black text-white" value="Hindi">Hindi</option>
//         <option className="bg-black text-white" value="English">English</option>
//         <option className="bg-black text-white" value="Marathi">Marathi</option>
//       </select>

//       {/* Genre */}
//       <select
//         value={genre}
//         onChange={(e) => setGenre(e.target.value)}
//         className="bg-black text-white border border-white/20 px-4 py-2 rounded-md"
//       >
//         <option className="bg-black text-white" value="All">All Genres</option>
//         <option className="bg-black text-white" value="Action">Action</option>
//         <option className="bg-black text-white" value="Romantic">Romantic</option>
//         <option className="bg-black text-white" value="Thriller">Thriller</option>
//         <option className="bg-black text-white" value="Sci-Fi">Sci-Fi</option>
//       </select>
//     </div>
//   );
// }

"use client";
import { useMovies } from "@/context/MovieContext";

export default function MovieFilter() {
  const { language, setLanguage, genre, setGenre, languages, genres } = useMovies();

  return (
    <div className="flex gap-4 mb-8">
     
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-black text-white border border-white/20 px-4 py-2 rounded-md outline-none focus:border-red-500"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang === "All" ? "All Languages" : lang}
          </option>
        ))}
      </select>

      
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="bg-black text-white border border-white/20 px-4 py-2 rounded-md outline-none focus:border-red-500"
      >
        {genres.map((gen) => (
          <option key={gen} value={gen}>
            {gen === "All" ? "All Genres" : gen}
          </option>
        ))}
      </select>
    </div>
  );
}