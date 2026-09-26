/**
 * db.js — Supabase PostgreSQL client (postgres.js / "postgres" npm package)
 *
 * This file is the postgres.js-based database client recommended by Supabase.
 * The existing server/config/db.js uses node-postgres (pg) and remains the
 * primary DB layer for all modules. Use this file when you need the postgres.js
 * API (tagged-template queries).
 *
 * Connection is read from DATABASE_URL in smart-campus/.env
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const sql = postgres(connectionString, {
  ssl: 'require', // Supabase always requires SSL
  max: 10,        // max connections in pool
  idle_timeout: 20,
  connect_timeout: 10,
});

module.exports = sql;
