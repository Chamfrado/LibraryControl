const Database = require("better-sqlite3");
const { app } = require("electron");
const path = require("node:path");
const fs = require("node:fs");

let db = null;

function getDatabase() {
  if (db) return db;

  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "bibliotecario.db");
  const bundledDb = path.join(app.getAppPath(), "bibliotecario.db");

  if (!fs.existsSync(dbPath) && fs.existsSync(bundledDb)) {
    fs.copyFileSync(bundledDb, dbPath);
  }

  db = new Database(dbPath);
  return db;
}

function getDatabasePath() {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "bibliotecario.db");
}

module.exports = { getDatabase, getDatabasePath };
