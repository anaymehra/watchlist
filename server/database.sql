CREATE DATABASE movies;

CREATE TABLE movies (
	id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    overview TEXT,
    release_date DATE,
	poster_path VARCHAR(255),
	rating DECIMAL(3,1),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    movie_id INT 
);