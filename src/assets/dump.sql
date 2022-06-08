CREATE TABLE IF NOT EXISTS paciente(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR, 
    apellido VARCHAR,
    enfermedad VARCHAR,
    nacimiento DATE,
    medicamento VARCHAR,
    usuario VARCHAR,
    contraseña VARCHAR
);
INSERT or IGNORE INTO songtable VALUES (1, 'Arnaldo', 'Navarrete', 'Cancer', '1995-06-02', 'Radiación', 'Arzatar', '1234');