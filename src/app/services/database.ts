export class Database{

  private createTableDoctor: string;
  private createTableUsuario: string;
  private insertIntoDoctor: string;
  private insertIntoUsuario: string;

  constructor(){}

  getCreateTableDoctor(){
    this.createTableDoctor = JSON.stringify(`
    CREATE TABLE IF NOT EXISTS doctor(
        id_doctor INTEGER PRIMARY KEY,
        nombre VARCHAR(20),
        apellido VARCHAR(20),
        especialidad VARCHAR(30),
        email VARCHAR(50)
    );`)
    return this.createTableDoctor;
  }    

  getCreateTableUsuario(){
    this.createTableUsuario = JSON.stringify(`
    CREATE TABLE IF NOT EXISTS usuario(
        rut VARCHAR(20) PRIMARY KEY NOT NULL,
        pass VARCHAR(20),
        nombre VARCHAR(20),
        apellido VARCHAR(20),
        telefono INTEGER(9),
        direccion VARCHAR(20),
        email VARCHAR(50),
        enfermedad VARCHAR(50),
        remedio VARCHAR(50),
        dosis VARCHAR(50),
        id_doctor INTEGER,
        FOREIGN KEY(id_doctor) REFERENCES doctor(id_doctor)
    );`)
    return this.createTableUsuario;
  }
  getInsertIntoDoctor(){
    this.insertIntoDoctor = JSON.stringify(`INSERT INTO usuario
    (rut, pass, nombre, apellido, telefono, direccion, email, enfermedad, remedio, dosis, id_doctor)
      VALUES
    ('19026008-9', '123456', 'Arnaldo', 'Navarrete', '946839644', 'Libertad 9465', 'arn.navarrete@duocuc.cl', 'VIH', 'Terapia Antirretroviral', '2 veces a la semana', 1),
    ('18879839-k', '123456', 'Alan', 'Moscoso', '962217128', 'José Donoso 11003', 'ala.moscoso@duocuc.cl', 'Asma', 'Salbutamol', '2 dosis cada 2 días', 2),
    ('asd', 'asd', 'Nombre asd', 'Apellido asd', '123456789', 'calle falsa 1234', 'asd.asd@asd.asd', 'ASD', 'asd', 'asd pastillas todas las mañanas', 2);`
    )
    return this.insertIntoDoctor;
  }
  getInsertIntoUsuario(){
    this.insertIntoUsuario = JSON.stringify(`INSERT INTO doctor
      (id_doctor, nombre, apellido, especialidad, email)
        VALUES
      (1, 'Eliseo', 'Chinchurreta', 'Inmunólogo', 'eli.chinchurreta@medico.cl'),
      (2, 'Ignacio', 'Saavedra', 'Neumólogo', 'ign.saavedra@medico.cl');`
    )
    return this.insertIntoUsuario;
  }

}