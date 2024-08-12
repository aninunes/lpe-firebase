import React, { useState, useEffect } from 'react';
import PopularMovies from '../componentes/telas/PopularMovies/PopularMovies';
import { getEstreiasAPI } from '../servicos/EstreiasServico';
import './menu-home.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [estreias, setEstreias] = useState([]);

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

        const fetchEstreias = async () => {
            const estreiasData = await getEstreiasAPI();
            setEstreias(estreiasData);
        };

        fetchPopularMovies();
        fetchEstreias();
    }, []);

    return (
        <div className="home-container">
            <div className="home-banner">
                <h1 className="home-title">NeonFlix</h1>
                <h2 className="home-subtitle">Seja bem-vindo ao sistema</h2>
            </div>
            <div className="estreias-banner">
                <div className="estreias-marquee">
                    {estreias.map((estreia, index) => (
                        <span className="estreia-item" key={index}>
                            {estreia.titulo} - {estreia.data_estreia}
                        </span>
                    ))}
                </div>
            </div>
            <div className="home-content">
                <h3 className="section-title">Filmes Populares</h3>
                <div className="movies-list">
                    {loading ? (
                        <p>Carregando filmes...</p>
                    ) : (
                        movies.map((movie) => (
                            <div className="movie-item" key={movie.id}>
                                <h3 className="movie-title">{movie.title}</h3>
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title} 
                                    className="movie-poster" 
                                />
                                <p className="movie-overview">{movie.overview}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
