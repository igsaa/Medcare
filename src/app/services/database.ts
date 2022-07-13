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
        peso INTEGER,
        altura INTEGER,
        edad INTEGER,
        factor_rh VARCHAR(20),
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
    (rut, pass, nombre, apellido, peso, altura, edad, factor_rh, telefono, direccion, email, enfermedad, remedio, dosis, id_doctor)
      VALUES
    ('19026008-9', '123456', 'Arnaldo', 'Navarrete', 80, 173, 27, 'B+', '946839644', 'Libertad 9465', 'arn.navarrete@duocuc.cl', 'VIH', 'Terapia Antirretroviral', '2 veces a la semana', 1),
    ('18879839-k', '123456', 'Alan', 'Moscoso', 100, 185, 28, 'O-', '962217128', 'José Donoso 11003', 'ala.moscoso@duocuc.cl', 'Asma', 'Salbutamol', '2 dosis cada 2 días', 3),
    ('19035108-4', '123456', 'Ignacio', 'Saavedra', 90, 180, 27, 'AB+', '979127147', 'Pericles 747', 'ig.saavedra@duocuc.cl', 'Hipertensión', 'Lisinopril 50mg.', '1/2 Pastilla al día', 2),
    ('14568914-7', '123456', 'Diego', 'Ramiro', 65, 140, 42, 'AB-', '989128634', 'Macul 5689', 'dieg.ramiro@duocuc.cl', 'Cirrosis', 'Amiodarona 200mg.', '2 pastillas cada 8 horas', 4),
    ('asd', 'asd', 'Nombre asd', 'Apellido asd', 1, 1, 1, '1+', '123456789', 'calle falsa 1234', 'asd.asd@asd.asd', 'Asd', 'asd', 'asd pastillas todas las mañanas', 1);`
    )
    return this.insertIntoDoctor;
  }
  
  getInsertIntoUsuario(){
    this.insertIntoUsuario = JSON.stringify(`INSERT INTO doctor
      (id_doctor, nombre, apellido, especialidad, email)
        VALUES
      (1, 'Eliseo', 'Chinchurreta', 'Inmunólogo', 'eli.chinchurreta@medico.cl'),
      (2, 'Javier', 'Schneider', 'Cardiólogo', 'jav.schneider@medico.cl'),
      (3, 'Camilo', 'Segovia', 'Neumólogo', 'cam.segovia@medico.cl'),
      (4, 'José', 'Tapia', 'Hepatólogo', 'jos.tapia@medico.cl');`
    )
    return this.insertIntoUsuario;
  }

}