CREATE DATABASE vocacional_db

/* Tabla de usuarios */
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    rol VARCHAR(25) NOT NULL
);
/* Tabla de tests, preguntas y opciones */
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);
/*Tabla de preguntas */
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);
/*Tabla de opciones*/
CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    option_value VARCHAR(5), -- (ej: A, B, C)
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
