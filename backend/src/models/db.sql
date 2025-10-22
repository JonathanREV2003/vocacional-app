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

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    option_value VARCHAR(5), -- (ej: A, B, C)
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
/*
/* Tabla de carreras */
CREATE TABLE careers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

/* Tabla de respuestas de usuarios */
CREATE TABLE user_responses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    option_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE
);

/* Tabla de puntuaciones por carrera */
CREATE TABLE career_scores (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    career_id INT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
    UNIQUE(user_id, career_id)
);*/