const e = require('express');
const {Pool} = require('pg');
const {db} = require('../config/config');

const pool = new Pool({
    user: db.user,
    host: db.host,
    password: db.password,
    port: db.port,
    database: db.database
});

module.exports = pool;