import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private database: SQLiteObject;
  private isReady: boolean;
  row_data: any = [];
  verificar: any = Boolean();
  tables = {
    usuario: "usuario"
  };

  constructor(private router: Router, private sqlite: SQLite, private platform: Platform) {
    if(!this.isReady){
      this.sqlite = new SQLite();
      this.sqlite.create({
        name: 'dara.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;
        db.executeSql(
          `create table if not exists ${this.tables.usuario} (rut varchar(20) PRIMARY KEY NOT NULL, pass varchar(16), number int(9), email varchar(50), address varchar(100))`,[]
        );
        this.isReady = true;
      }).catch((e)=>{
        console.log('tabla no creada');
      })
    }
  }


  guardarDatos(rut: string, pass: string){
    this.database.executeSql("INSERT INTO usuario (rut, pass) VALUES (?, ?)",
    [rut, pass]).then(() =>{
      this.cargarDatos(rut);
      alert(`Row Inserted!`);
      }).catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  cargarDatos(rut: any){
    this.database.executeSql("SELECT * FROM usuario where rut = ?", [rut])
    .then((data) => {
      this.row_data = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.row_data.push({
            rut: data.rows.item(i).rut,
            pass: data.rows.item(i).pass
          });            
        }          
      }
      console.log(Object.values(this.row_data.map(a => a.rut)));
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }

  consultarDatos(rut: any, pass: any): boolean{
    this.database.executeSql("SELECT * FROM usuario where rut = ?", [rut])
    .then((data) => {
      this.row_data = [];
      let ver: boolean;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.row_data.push({
            rut: data.rows.item(i).rut,
            pass: data.rows.item(i).pass
          });
        }
        if (this.row_data.map(a => a.rut) == rut && 
        this.row_data.map(a => a.pass) == pass){
          alert("Login Succesfully")
        }
        else{
          alert("Datos Incorrectos")
        }
      }
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
    return true;
  }

  canActivate() {
    this.router.navigate(['/home'])
    return false;
  }
}
