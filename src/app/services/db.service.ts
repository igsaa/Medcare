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
        this.createTables(db, this.database.getCreateTableDoctor());
        this.createTables(db, this.database.getCreateTableUsuario());
        this.insertIntos(db, this.database.getInsertIntoDoctor());
        this.insertIntos(db, this.database.getInsertIntoUsuario());
      }).catch((e)=>{
        alert(e)
      })
    }
  }

  //Este método ejecuta las funciones para crear las tablas de la base de datos
  createTables(db: SQLiteObject, createTable: any) {
    db.executeSql(JSON.parse(createTable), []).catch(e => {
        alert(`error createTables(): ` + JSON.stringify(e))
    });
  }

  //Este método ejecuta las funciones para insertar los datos dentro de las tablas de la base de datos
  insertIntos(db: SQLiteObject, insertInto){
    db.executeSql(JSON.parse(insertInto), [])
      .catch(e => {});
  }

  //Consulta que se realiza a la base de datos para comprobar el usuario y la contraseña
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

  //Consulta a la base de datos que ingresa los datos del usuario logeado
  //dentro de una array para manjerlos de una mejor manera
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
              peso: data.rows.item(i).peso,
              altura: data.rows.item(i).altura,
              edad: data.rows.item(i).edad,
              factor_rh: data.rows.item(i).factor_rh,
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

  //Método que guarda los datos del usuario y el doctor a cargo dentro del
  //Storage local del dispositivo
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

  //Método que actualiza los datos del usuario acorde a la página /my-data
  async updateDatos(rut: any, telefono: any, email: any, direccion: any){
    await this.dbObject.executeSql(`UPDATE usuario SET
    telefono = ?,
    email = ?,
    direccion = ?
    WHERE rut = ?`, [telefono, email, direccion, rut]).catch(e => {
      alert('error' + JSON.stringify(e))
    })
  }

  //Consulta a la base de datos que ingresa los datos del doctor a cargo del usuario
  //logeado dentro de una array para manjerlos de una mejor manera
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


