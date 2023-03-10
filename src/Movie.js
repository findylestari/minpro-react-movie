import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import MovieBox from "./Components/MovieBox/MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";

function Movie() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_APIURL}movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
            )
            .then((response) => {
                console.log(response.data.results)
                setMovies(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const searchMovie = async (e) => {
        e.preventDefault();
        console.log("Searching");
        try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
        } catch (e) {
            console.log(e);
        }
    };

    const changeHandler = (e) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <section className="search-hero px-4 d-flex align-items-center">
                <div className="container-fluid">
                    <div className="mb-5">
                        <h1 className="fs-1 fw-bold text-light">Welcome.</h1>
                        <h1 className="fs-2 fw-semibold text-light">
                            Pick Your Favourite Movies. And Explore Now!
                        </h1>
                    </div>
                    <form className="d-flex group-search" onSubmit={searchMovie}>
                        <input type="search" className="form-control form-search" placeholder="Search for a movie" aria-label="search" name="query" value={query} onChange={changeHandler}/>
                        <button className="btn btn-secondary btn-search" type="submit">
                            <i className="ri-search-line"></i>
                        </button>
                    </form>
                </div>
            </section>
            <div className="px-4 mt-5">
                {movies.length > 0 ? (
                    <div className="container-fluid">
                        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 g-2">
                            {movies.map((movie, index) => (
                                <div key={index}>
                                    <MovieBox {...movie} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{height: "300px"}}>
                        <h1 className="text-center">There are no movie that matched your query.</h1>
                    </div>
                )}
            </div>
        </>
    );
}

export default Movie;
