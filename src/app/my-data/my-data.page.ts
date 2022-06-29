import { Component, OnInit } from '@angular/core';

import { DbService } from '../services/db.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  array_usuarios: any = [];
  telefono: any;
  email: any;
  direccion: any;

  constructor(private dbservice: DbService) {}

  ngOnInit() {
  }

  /* llenarTelefono(){
    this.dbservice.datosUsuario(this.homepage.rut, this.dbservice.database).then((array: any) => {
      this.array_usuarios = array;
      this.telefono = array.map(usuario => usuario.telefono)
    });

  } */

}
