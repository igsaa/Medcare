import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private router: Router, private sqlite: SQLite) { 
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('create table if not exists usuario(rut varchar(15), pass varchar(16), phoneNumber int(9), email varchar(50), address varchar(100))', []).then(()=>{
      }).catch(e =>{
        console.log('table not created')
      })
      console.log('table created')
    }).catch(e =>{
      console.log('database not created')
    })
    console.log('datebase created')
  }

  canActivate() {
    this.router.navigate(['/home'])
    return false;
  }
}
