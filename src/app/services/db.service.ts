import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private database: SQLiteObject;
  private isReady: boolean;
  row_data: any = [];
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
          `create table if not exists ${this.tables.usuario} (rut varchar(20), pass varchar(16), number int(9), email varchar(50), address varchar(100))`,[]
        );
        this.isReady = true;
      }).catch((e)=>{
        console.log('tabla no creada');
      })
    }
  }


  guardarDatos(rut: string, pass: string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO usuario (rut, pass) VALUES (?, ?)";
      this.database.executeSql(sql, [rut, pass]).then((data) =>{
        resolve(data);
        console.log('usuario guardado');
      }, (error) => {
        reject(error);
      });
    });
  }

  /**getRows() {
    this.database.executeSql(`SELECT * FROM ${this.tables.usuario}`,[])
      .then((data) => {
        this.row_data = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.row_data.push(data.rows.item(i));
          }
        }
      })
      .catch(e => {
        console.log("error")
      });
  }**/

  cargarDatos(rut: any){
    return new Promise ((resolve, reject) => {
      this.database.executeSql("SELECT * FROM usuario where rut = ?", [rut]).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              rut: data.rows.item(i).rut,
              pass: data.rows.item(i).pass
            });            
          }          
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

  canActivate() {
    this.router.navigate(['/home'])
    return false;
  }
}
