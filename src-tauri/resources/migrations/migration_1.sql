-- SQLite
CREATE TABLE IF NOT EXISTS carrera (
    id INTEGER PRIMARY KEY,
    orden INTEGER NOT NULL,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tramo (
    id INTEGER PRIMARY KEY,
    carrera_id INTEGER NOT NULL,
    orden INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    factor REAL NOT NULL,
    FOREIGN KEY (carrera_id) REFERENCES carrera(id)
);

CREATE TABLE IF NOT EXISTS cita (
    id INTEGER PRIMARY KEY,
    tramo_id INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    metro REAL NOT NULL,
    metro_teorico REAL,
    FOREIGN KEY (tramo_id) REFERENCES tramo(id)
);

CREATE TABLE IF NOT EXISTS curva (
    id INTEGER PRIMARY KEY,
    tramo_id INTEGER NOT NULL,
    cita_inicial_id INTEGER NOT NULL,
    cita_final_id INTEGER NOT NULL,
    grados REAL NOT NULL,
    is_right INTEGER NOT NULL,
    FOREIGN KEY (tramo_id) REFERENCES tramo(id),
    FOREIGN KEY (cita_inicial_id) REFERENCES cita(id),
    FOREIGN KEY (cita_final_id) REFERENCES cita(id)
);

CREATE INDEX IF NOT EXISTS idx_carrera_orden ON carrera (orden);

CREATE INDEX IF NOT EXISTS idx_tramo_orden ON tramo (orden);

CREATE INDEX IF NOT EXISTS idx_cita_metro ON cita (metro);

