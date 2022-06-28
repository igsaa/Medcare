import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  database: SQLiteObject;
  isReady: boolean;
  array_usuarios: any = [];
  array_doctores: any = [];
  verificar_usuario_correcto: boolean;
  readonly database_name: string = "medcare.db";
  tables = {
    usuario: "usuario",
    doctor: "doctor"
  };

  constructor(private router: Router, private sqlite: SQLite, private platform: Platform) {
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
        console.log('error constructor()' + e);
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
        email VARCHAR(50), ADDRESS VARCHAR(100),
        id_doctor INTEGER,
        FOREIGN KEY(id_doctor) REFERENCES ${this.tables.doctor}(id_doctor)
    );`, []).catch(e => {
          alert(`error createTables().${this.tables.usuario}` + JSON.stringify(e))
        });
  }

  insertIntos(db: SQLiteObject){
    db.executeSql(`INSERT INTO ${this.tables.usuario}
      (rut, pass, nombre, apellido, telefono, direccion, email, id_doctor)
        VALUES
      ('19026008-9', '123456', 'Arnaldo', 'Navarrete', '946839644', 'Libertad 9465', 'arn.navarrete@duocuc.cl', '1'),
      ('123', 'asd', 'Arnaldo', 'Navarrete', '946839644', 'Libertad 9465', 'arn.navarrete@duocuc.cl', '1')`, [])
      .catch(e => {
        alert("error insertIntos() usuarios" + JSON.stringify(e))
      });
    db.executeSql(`INSERT INTO ${this.tables.doctor}
      (nombre, apellido, especialidad, email)
        VALUES
      ('Eliseo', 'Chinchurreta', 'Proctologo', 'eli.chichu@medico.cl');`, [])
      .catch(e => {
        alert("error insertIntos() doctor" + JSON.stringify(e))
      });
  }

  consultarDatos(rut: any, pass: any, db: SQLiteObject){
    return new Promise((resolve) => {
      return db.executeSql(`SELECT * FROM ${this.tables.usuario} where rut = ?`, [rut])
    .then((data) => {
      this.array_usuarios = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.array_usuarios.push({
            rut: data.rows.item(i).rut,
            pass: data.rows.item(i).pass
          });
        }
        if (this.array_usuarios.map(usuario => usuario.rut) == rut && 
        this.array_usuarios.map(usuario => usuario.pass) == pass){
          this.verificar_usuario_correcto = true;
          resolve(this.verificar_usuario_correcto);
        }
        else{
          this.verificar_usuario_correcto = false;
          resolve(this.verificar_usuario_correcto);
        }
      }else{
        alert(`Usuario o Contraseña incorrectos`)
      }
    }).catch(e => {
      alert("error consultarDatos() 2do IF" + JSON.stringify(e))
    });
    });
  }

  canActivate() {
    this.router.navigate(['/home'])
    return false;
  }
}


