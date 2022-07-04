import { Component, OnInit } from '@angular/core';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage{
  storage = Storage;
  array_usuarios = [];
  nombre: any;
  remedio: any;
  today: any;

  constructor(private dbservice: DbService, private modalCtrl: ModalController, private route: ActivatedRoute) {
    try{
      this.llenarDatos()
    }
    catch(e){
        console.log("TRY CATCH DEL START PAGE: " + e)
    }
  }
  
  async llenarDatos(){
      this.array_usuarios = [];
      await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuarios = JSON.parse(array.value)})
      .then(() => {
        this.nombre = this.array_usuarios.map(usuario => usuario.nombre)
        this.remedio = this.array_usuarios.map(usuario => usuario.remedio)
      })
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MyModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
  }
}
