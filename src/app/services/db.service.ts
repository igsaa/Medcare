import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Database } from './database';


@Injectable({
  providedIn: 'root'
})

export class DbService {
  dbObject: SQLiteObject;
  database: Database = new Database();
  storage = Storage;
  isReady: boolean;
  array_usuario_login: any = [];
  public array_usuarios: any = [];
  public array_doctores: any = [];
  verificar_usuario_correcto: boolean;

  constructor(private sqlite: SQLite, private platform: Platform) {
    if(!this.isReady){
      this.sqlite = new SQLite();
      this.sqlite.create({
        name: 'medcare.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.dbObject = db;
        this.createTables(db);
        this.insertIntos(db);
      }).catch((e)=>{
        alert(e)
      })
    }
  }

  createTables(db: SQLiteObject) {
    db.executeSql(JSON.parse(this.database.getCreateTableDoctor()), []).catch(e => {
        alert(`error createTables().doctor` + JSON.stringify(e))
    });
    db.executeSql(JSON.parse(this.database.getCreateTableUsuario()), []).catch(e => {
          alert(`error createTables().usuario` + JSON.stringify(e))
    });
  }

  insertIntos(db: SQLiteObject){
    db.executeSql(JSON.parse(this.database.getInsertIntoDoctor()), [])
      .catch(e => {});
    db.executeSql(JSON.parse(this.database.getInsertIntoUsuario()), [])
      .catch(e => {});
  }

  consultarDatosLogin(rut: any, pass: any, db: SQLiteObject){
    return new Promise((resolve) => {
      return db.executeSql(`SELECT * FROM usuario WHERE rut = ?`, [rut])
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
      return this.dbObject.executeSql(`SELECT * FROM usuario WHERE rut = ?`,[rut])
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
        await this.datosDoctor(array[0].id_doctor)
        .then(async (array) => {
          await this.storage.set({key: 'doctor', value: JSON.stringify(array)})
          resolve(rut)
        })
      })
    })
  }

  async updateDatos(rut: any, telefono: any, email: any, direccion: any){
    await this.dbObject.executeSql(`UPDATE usuario SET
    telefono = ?,
    email = ?,
    direccion = ?
    WHERE rut = ?`, [telefono, email, direccion, rut]).catch(e => {
      alert('error' + JSON.stringify(e))
    })
  }

  datosDoctor(id: any) {
    return new Promise((resolve) => {
      return this.dbObject.executeSql(`SELECT * FROM doctor WHERE id_doctor = ?`,[id])
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


