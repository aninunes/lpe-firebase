import React, { useEffect, useState } from 'react';
import './PopularMovies.css';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/popular';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjhhOWFlN2FjZGFiMmQ4ODllZTlhMjgzZThmOWI1OCIsIm5iZiI6MTcyMTUzNjg4OC4yOTE4NjYsInN1YiI6IjY2Mzg3MTQwMmZhZjRkMDEyN2M2MzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pd4ioij_dhOOicDhnlcmHgbj5o-cQYtSRgsL1la9G8k'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="movies-container">
      {loading ? (
        <p>Carregando filmes...</p>
      ) : (
        movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="movie-poster" 
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PopularMovies;
