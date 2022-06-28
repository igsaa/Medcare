CREATE TABLE IF NOT EXISTS usuario(
    rut VARCHAR(20) PRIMARY KEY NOT NULL,
    pass VARCHAR(20),
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    telefono INTEGER(9),
    direccion VARCHAR(20),
    email VARCHAR(50), ADDRESS VARCHAR(100),
    id_doctor INTEGER FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS doctor(
    id_doctor INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    especialidad VARCHAR(30),
    email VARCHAR(50), ADDRESS VARCHAR(100)
);

INSERT INTO usuario(rut, pass, nombre, apellido, telefono, direccion, email, id_doctor) VALUES ('asd', '123', 'Arnaldo', 'Navarrete', '946839644', 'Libertad 9465', 'arn.navarrete@duocuc.cl', '1');

INSERT INTO doctor(nombre, apellido, especialidad, email) VALUES ('Eliseo', 'Chinchurreta', 'Proctologo', 'eli.chichu@medico.cl');