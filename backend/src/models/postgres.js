const e = require('express');
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'jony123',
    port: 5432,
    database: 'vocacional_db'
});

module.exports = pool;