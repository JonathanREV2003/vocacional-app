import { Pool } from 'pg';
import { db } from '../config/config.js';

const pool = new Pool({
    user: db.user,
    host: db.host,
    password: db.password,
    port: db.port,
    database: db.database
});

export default pool;