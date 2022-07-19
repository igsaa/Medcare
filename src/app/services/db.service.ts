import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@capacitor/storage';
import { Database } from './database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  dbObject: SQLiteObject;
  database: Database = new Database();
  storage = Storage;
  database_isReady = '';
  user_is_logged: boolean = false;
  array_usuario_login: any = [];
  public array_usuarios: any = [];
  public array_doctores: any = [];
  verificar_usuario_correcto: boolean;
  delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private sqlite: SQLite, private router: Router) {
    this.getDatabase_IsReady().then(async ()=>{
      await this.setUser_is_loged();
      if(!this.user_is_logged){
        if(this.database_isReady != 'true'){
          this.sqlite = new SQLite();
          await this.setDatabase().then(async ()=>{
            await this.storage.set({key: 'horaMedica_array', value: JSON.stringify([])}) //Se setea la array en storage para evitar errores
            await this.storage.set({key: 'alarma_array', value: JSON.stringify([])}) //Se setea la array en storage para evitar errores
            await this.storage.set({key: 'estado_array', value: JSON.stringify([])}) //Se setea la array en storage para evitar errores
            await this.createTables(this.dbObject, this.database.getCreateTableDoctor());
            await this.createTables(this.dbObject, this.database.getCreateTableUsuario());
            await this.insertIntos(this.dbObject, this.database.getInsertIntoDoctor());
            await this.insertIntos(this.dbObject, this.database.getInsertIntoUsuario());
            console.log('\nBase de datos creada correctamente')
            await this.setDatabase_IsReady('true')
            await this.delay(1200)
            await this.router.navigateByUrl('/login', { replaceUrl: true });
          }).catch((e)=>{
            alert(e)
          })
        }else{
          await this.setDatabase()
          await this.delay(1200)
          console.log('\nLa base de datos ya fue creada en el dispositivo')
          await this.router.navigateByUrl('/login', { replaceUrl: true });
        }
      }else{
        await this.setDatabase()
        await this.delay(1200)
        console.log("\nUsuario logeado, redirigiendo a inicio")
        await this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });    
  }

  //Método que crea / abre la base de datos
  async setDatabase(){
    await this.sqlite.create({
      name: 'medcare.db',
      location: 'default'
    }).then(async (db: SQLiteObject)=>{
      this.dbObject = db;      
    })
  }
  
  //Método que asigna isReady para la comprobación en la inicialización del servicio
  async getDatabase_IsReady(){
      await this.storage.get({key: 'database_isReady'})
      .then((data) => {
        this.database_isReady = data.value;
      })      
  }

  //Método que asigna user_is_loged para comprobar si el usuario está logeado o no en la aplicación
  async setUser_is_loged(){
    await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuario_login = JSON.parse(array.value)})
    if(this.array_usuario_login == null){
      this.user_is_logged = false;
    }else{
      this.user_is_logged = true;
    }
  }

  //Método que reemplaza isReady con el valor otorgado para la comprobación en la inicialización del servicio
  async setDatabase_IsReady(value: any){
    await this.storage.remove({key: 'database_isReady'})
    await this.storage.set({key: 'database_isReady', value: value})
  }

  //Éste método ejecuta las funciones para crear las tablas de la base de datos
  async createTables(db: SQLiteObject, createTable: any) {
     await db.executeSql(JSON.parse(createTable), []).catch(e => {
        alert(`error createTables(): ` + JSON.stringify(e))
    });
  }

  //Éste método ejecuta las funciones para insertar los datos dentro de las tablas de la base de datos
  async insertIntos(db: SQLiteObject, insertInto){
    await db.executeSql(JSON.parse(insertInto), [])
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


