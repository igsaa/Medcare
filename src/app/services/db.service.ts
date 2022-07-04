import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})

export class DbService {
  database: SQLiteObject;
  storage = Storage;
  isReady: boolean;
  array_usuario_login: any = [];
  public array_usuarios: any = [];
  public array_doctores: any = [];
  verificar_usuario_correcto: boolean;
  readonly database_name: string = "medcare.db";
  tables = {
    usuario: "usuario",
    doctor: "doctor"
  };

  constructor(private sqlite: SQLite, private platform: Platform) {
    if(!this.isReady){
      this.sqlite = new SQLite();
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;
        this.createTables(db);
        this.insertIntos(db);
        this.isReady = true;
      }).catch((e)=>{
        alert(`error constructor()` + JSON.stringify(e))
      })
    }
  }

  createTables(db: SQLiteObject) {
    db.executeSql(`
      CREATE TABLE IF NOT EXISTS ${this.tables.doctor}(
        id_doctor INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(20),
        apellido VARCHAR(20),
        especialidad VARCHAR(30),
        email VARCHAR(50), ADDRESS VARCHAR(100)
    );`, []).catch(e => {
        alert(`error createTables().${this.tables.doctor}` + JSON.stringify(e))
      });
    db.executeSql(`
      CREATE TABLE IF NOT EXISTS ${this.tables.usuario}(
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
        FOREIGN KEY(id_doctor) REFERENCES ${this.tables.doctor}(id_doctor)
    );`, []).catch(e => {
          alert(`error createTables().${this.tables.usuario}` + JSON.stringify(e))
        });
  }

  insertIntos(db: SQLiteObject){
    db.executeSql(`INSERT INTO ${this.tables.usuario}
      (rut, pass, nombre, apellido, telefono, direccion, email, enfermedad, remedio, dosis, id_doctor)
        VALUES
      ('19026008-9', '123456', 'Arnaldo', 'Navarrete', '946839644', 'Libertad 9465', 'arn.navarrete@duocuc.cl', 'VIH', 'Terapia Antirretroviral', '2 veces a la semana', '1'),
      ('18879839-k', '123456', 'Alan', 'Moscoso', '962217128', 'José Donoso 11003', 'ala.moscoso@duocuc.cl', 'Asma', 'Salbutamol', '2 dosis cada 2 días', '2'),
      ('asd', 'asd', 'Nombre asd', 'Apellido asd', '123456789', 'calle falsa 1234', 'asd.asd@asd.asd', 'ASD', 'asd', 'asd pastillas todas las mañanas', '2')`, [])
      .catch(e => {});
    db.executeSql(`INSERT INTO ${this.tables.doctor}
      (nombre, apellido, especialidad, email)
        VALUES
      ('Eliseo', 'Chinchurreta', 'Inmunólogo', 'eli.chinchurreta@medico.cl'),
      ('Ignacio', 'Saavedra', 'Neumólogo', 'ign.saavedra@medico.cl');`, [])
      .catch(e => {});
  }

  consultarDatosLogin(rut: any, pass: any, db: SQLiteObject){
    return new Promise((resolve) => {
      return db.executeSql(`SELECT * FROM ${this.tables.usuario} WHERE rut = ?`, [rut])
    .then((data) => {
      this.array_usuario_login = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.array_usuario_login.push({
            rut: data.rows.item(i).rut,
            pass: data.rows.item(i).pass
          });
        }
        if (this.array_usuario_login.map(usuario => usuario.rut) == rut && 
        this.array_usuario_login.map(usuario => usuario.pass) == pass){
          this.verificar_usuario_correcto = true;
          resolve(this.verificar_usuario_correcto);
        }
        else{
          this.verificar_usuario_correcto = false;
          resolve(this.verificar_usuario_correcto);
        }
      }else{
        this.verificar_usuario_correcto = false;
        resolve(this.verificar_usuario_correcto);
      }
    }).catch(e => {
      alert("error consultarDatosLogin() 1er if" + JSON.stringify(e))
    });
    });
  }

  datosUsuario(rut: any) {
    return new Promise((resolve) => {
      return this.database.executeSql(`SELECT * FROM ${this.tables.usuario} WHERE rut = ?`,[rut])
      .then((data) => {
        this.array_usuarios = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.array_usuarios.push({
              rut: data.rows.item(i).rut,
              pass: data.rows.item(i).pass,
              nombre: data.rows.item(i).nombre,
              apellido: data.rows.item(i).apellido,
              telefono: data.rows.item(i).telefono,
              direccion: data.rows.item(i).direccion,
              email: data.rows.item(i).email,
              enfermedad: data.rows.item(i).enfermedad,
              remedio: data.rows.item(i).remedio,
              dosis: data.rows.item(i).dosis,
              id_doctor: data.rows.item(i).id_doctor
            });
          }
          resolve(this.array_usuarios);
        }else{
          resolve(this.array_usuarios);
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      })
    });
  }

  guardarDatos(rut: any){
    return new Promise((resolve) => {
      this.datosUsuario(rut)
      .then(async (array) => {
        await this.storage.set({key: 'usuario', value: JSON.stringify(array)})
        resolve('\nDatos guardados con éxito')
      })
    })
  }

  datosDoctor(id: any) {
    return new Promise((resolve) => {
      return this.database.executeSql(`SELECT * FROM ${this.tables.doctor} WHERE id_doctor = ?`,[id])
      .then((data) => {
        this.array_doctores = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.array_doctores.push({
              nombre: data.rows.item(i).nombre,
              apellido: data.rows.item(i).apellido,
              especialidad: data.rows.item(i).especialidad,
              email: data.rows.item(i).email
            });
          }
          resolve(this.array_doctores);
        }else{
          resolve(this.array_doctores);
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    });
  }

}


