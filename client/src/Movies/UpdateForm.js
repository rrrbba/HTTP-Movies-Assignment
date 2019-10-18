import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        const movieToEdit = props.movies.find(movie => {
            return `${movie.id}` === props.match.params.id 
        });
 
        if (movieToEdit) {
        setMovie(movieToEdit);
        }

    },  [props.movie, props.match.params.id])



    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
  
        setMovie({
            ...movie,
            [event.target.name] : value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        //Make PUT request to edit item
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.history.push('/movies');
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Update Movie</h1>

            <form onSubmit = {handleSubmit}>

                <input  
                    type = "text"
                    name = "title" 
                    onChange = {changeHandler}
                    placeholder = "Title"
                    value = {movie.title}
                />

            <div className="baseline" />

                <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director"
                value={movie.director}
                />
             <div className="baseline" />

            <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            placeholder="Metascore"
            value={movie.metascore}
            />
            <div className="baseline" />

            <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="Actors"
            value={movie.stars}
            />
            <div className="baseline" />

            <button className="md-button form-button">Update</button>
         </form>

        </div>
    )






}

export default UpdateForm;