import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})

export class MyDataPage{
  storage = Storage;
  array_usuarios: any = [];
  telefono: any;
  email: any;
  direccion: any;

  constructor(private dbservice: DbService) {
    try{
      this.llenarDatos()
    }
    catch(e){
        console.log("TRY CATCH DE MY-DATA PAGE: " + e)
    }
  }

  async llenarDatos(){
    this.array_usuarios = [];
    await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuarios = JSON.parse(array.value)})
    .then(() => {
      this.telefono = this.array_usuarios.map(usuario => usuario.telefono)
      this.email = this.array_usuarios.map(usuario => usuario.email)
      this.direccion = this.array_usuarios.map(usuario => usuario.direccion)
    })
  }

}
