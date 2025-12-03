const createtable = 
    `CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
)`

export default createtable